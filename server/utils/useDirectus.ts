import { consola } from 'consola'

type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

const LOG_RANK: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
}

function shouldLog(current: LogLevel, want: LogLevel) {
  return LOG_RANK[current] >= LOG_RANK[want]
}

function safeJson(value: unknown, maxLen = 25_000) {
  try {
    const s = JSON.stringify(value, null, 2)
    return s.length > maxLen ? `${s.slice(0, maxLen)}\n…(truncated)` : s
  } catch {
    return String(value)
  }
}

function toQueryString(q: unknown): string {
  if (typeof q === 'string') return q
  if (
    q &&
    typeof q === 'object' &&
    'default' in q &&
    typeof (q as any).default === 'string'
  ) {
    return (q as any).default
  }
  const body = (q as any)?.loc?.source?.body
  if (typeof body === 'string') return body
  const source = (q as any)?.source
  if (typeof source === 'string') return source
  throw new Error(
    `GraphQL query import is not a string. Got: ${Object.prototype.toString.call(q)}`,
  )
}

type GraphQLError = { message: string; extensions?: Record<string, unknown> }
type GraphQLResponse<T> = { data?: T; errors?: GraphQLError[] }

export type DirectusRequestOptions = {
  token?: string
  logLevel?: LogLevel
  headers?: Record<string, string>
}

export function useDirectus() {
  const config = useRuntimeConfig()

  const url = config.directus?.url as string | undefined
  const defaultToken = config.directus?.token as string | undefined
  const defaultLogLevel =
    (config.directus?.logLevel as LogLevel | undefined) ?? 'info'

  if (!url) throw new Error('Missing runtimeConfig.directus.url')

  async function request<
    TData,
    TVariables extends Record<string, any> | undefined = undefined,
  >(
    query: unknown,
    variables?: TVariables,
    opts: DirectusRequestOptions = {},
  ): Promise<TData> {
    const token = opts.token ?? defaultToken
    const logLevel = opts.logLevel ?? defaultLogLevel
    const queryStr = toQueryString(query)

    if (shouldLog(logLevel, 'debug')) {
      consola.debug('[Directus][GQL] query length:', queryStr.length)
      consola.debug('[Directus][GQL] variables:\n' + safeJson(variables ?? {}))
      consola.debug('[Directus][GQL] query preview:\n' + queryStr.slice(0, 400))
    }

    try {
      const res = await $fetch<GraphQLResponse<TData>>(`${url}/graphql`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(opts.headers ?? {}),
        },
        body: {
          query: queryStr,
          variables: variables ?? {},
        },
      })

      if (res.errors?.length) {
        if (shouldLog(logLevel, 'error')) {
          consola.error(
            '[Directus][GQL] GraphQL errors:\n' + safeJson(res.errors),
          )
        }
        throw createError({
          statusCode: 500,
          statusMessage: 'Directus GraphQL error',
          data: res.errors,
        })
      }

      if (shouldLog(logLevel, 'info')) consola.info('[Directus][GQL] OK')
      if (shouldLog(logLevel, 'trace'))
        consola.trace('[Directus][GQL] data:\n' + safeJson(res.data, 200_000))

      return res.data as TData
    } catch (err: any) {
      if (shouldLog(logLevel, 'error')) {
        consola.error(
          '[Directus][GQL] HTTP',
          err?.statusCode,
          err?.statusMessage,
        )
        if (err?.data)
          consola.error('[Directus][GQL] response:\n' + safeJson(err.data))
      }
      throw err
    }
  }

  return { request }
}
