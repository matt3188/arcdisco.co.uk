import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'graphql/schema.graphql',
  documents: ['graphql/**/*.graphql'],
  generates: {
    'graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
}

export default config
