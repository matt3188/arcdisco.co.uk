import TestDirectus from '~~/graphql/queries/TestDirectus.graphql'
import type { TestDirectusQuery } from '~/graphql/generated/graphql'

export default defineEventHandler(async () => {
  const { request } = useDirectus()

  const data = await request<TestDirectusQuery>(TestDirectus)

  return data
})
