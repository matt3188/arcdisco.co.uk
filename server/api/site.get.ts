import { GetArcSiteDocument } from '~graphql/generated/graphql'
import type { GetArcSiteQuery } from '~graphql/generated/graphql'
import { print } from 'graphql'

export default defineEventHandler(async (event) => {
  const { request } = useDirectus()

  const GetArcSiteQueryString = print(GetArcSiteDocument)
  try {
    const res = await request<GetArcSiteQuery>(GetArcSiteQueryString)
    return res
  } catch (error: any) {
    if (error?.statusCode) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch site data',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})
