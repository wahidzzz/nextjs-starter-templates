import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import CacheObject from './cache'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API
})
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    }
  }
})
const client = new ApolloClient({
  name: 'hotel-web',
  link: authLink.concat(httpLink),
  cache: CacheObject
  // assumeImmutableResults: true,
})

export default client
