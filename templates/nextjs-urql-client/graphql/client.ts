import { createClient,defaultExchanges } from 'urql';
import { devtoolsExchange } from '@urql/devtools';

// urql client
const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API ?? "http://localhost:3000/api/graphql",
  // dev tools for debugging
  exchanges: [devtoolsExchange, ...defaultExchanges],
  fetchOptions: () => {
    return {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? "" },
    };
  },
});

export default client
/**
 * Cache strategy is subject in urql ecosystem
 * User is adviced to user there own exchanges
 * More details - https://formidable.com/open-source/urql/docs/architecture/#the-exchanges
 */
