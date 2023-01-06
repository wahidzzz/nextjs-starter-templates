import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      // graphql endpoint to be used here
      [process.env.NEXT_PUBLIC_GRAPHQL_API ?? ""]: {
        headers: {
          // api-key to be used here
          'x-api-key': ""
        }
      }
    }
  ],
  documents: '**/*.{gql,graphql}',
  generates: {
    'src/graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: '@apollo/client'
      }
    }
  }
}

export default config

// ** More Details - https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config
