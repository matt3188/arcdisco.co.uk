import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `${process.env.NUXT_PUBLIC_DIRECTUS_URL}/graphql`,
  documents: ['graphql/**/*.graphql'],
  generates: {
    'graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
}

export default config
