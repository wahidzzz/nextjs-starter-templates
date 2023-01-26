import '../styles/globals.css'
import type { AppProps } from 'next/app'

// ** Rest Client Provider - React Query
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// ** Query Client init
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (<QueryClientProvider client={queryClient}><Component {...pageProps} /><ReactQueryDevtools initialIsOpen={false} position="bottom-right" /></QueryClientProvider>)
}
