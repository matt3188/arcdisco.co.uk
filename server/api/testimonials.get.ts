import { GetArcTestimonialsDocument } from '~graphql/generated/graphql'
import type { GetArcTestimonialsQuery } from '~graphql/generated/graphql'
import { print } from 'graphql'

export default defineEventHandler(async (event) => {
  const { request } = useDirectus()

  const GetArcTestimonialsQueryString = print(GetArcTestimonialsDocument)
  try {
    const res = await request<GetArcTestimonialsQuery>(
      GetArcTestimonialsQueryString,
    )
    return res.arc_block_testimonials
  } catch (error: any) {
    if (error?.statusCode) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch testimonials',
      message: error instanceof Error ? error.message : String(error),
    })
  }
})
