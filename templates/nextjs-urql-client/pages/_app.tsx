import '../styles/globals.css'
import type { AppProps } from 'next/app'

// ** Graphql Client Provider - Apollo Client
import { Provider } from 'urql'
import client from "../graphql/client"

export default function App({ Component, pageProps }: AppProps) {
  return (<Provider value={client}><Component {...pageProps} /></Provider>)
}
