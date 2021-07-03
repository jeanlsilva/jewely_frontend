import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { ReactQueryDevtools } from 'react-query/devtools'
import {  QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';
import { AuthProvider } from '../contexts/AuthContext';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChakraProvider resetCSS theme={theme}>
            <SidebarDrawerProvider>
              <Component {...pageProps} />
            </SidebarDrawerProvider>
          </ChakraProvider>
        </AuthProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default MyApp
