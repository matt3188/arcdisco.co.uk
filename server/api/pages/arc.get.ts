import { GetArcPageDocument } from '~graphql/generated/graphql'
import type { GetArcPageQuery } from '~graphql/generated/graphql'
import { print } from 'graphql'

function normalizePermalink(input: unknown): string {
  if (Array.isArray(input)) {
    const joined = input.filter(Boolean).join('/')
    return joined ? `/${joined}` : '/'
  }
  if (typeof input === 'string') {
    const trimmed = input.trim()
    return trimmed === '' ? '/' : trimmed
  }
  return '/'
}

function looksLikeAssetPath(path: string): boolean {
  return path.includes('.') && !path.endsWith('.html')
}

const GetArcPageQueryString = print(GetArcPageDocument)

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const permalink = normalizePermalink(query.permalink)

  if (looksLikeAssetPath(permalink)) {
    // Return a real value to avoid client-side duplication warnings
    setResponseStatus(event, 204)
    return null
  }

  const { request } = useDirectus()

  try {
    const res = await request<GetArcPageQuery>(GetArcPageQueryString, {
      permalink,
    })
    const arc_content = res?.arc_content ?? []

    if (arc_content.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `No page found for permalink: ${permalink}`,
      })
    }

    return arc_content[0]
  } catch (error: any) {
    if (error?.statusCode) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch page data',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})
