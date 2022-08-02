import '../styles/globals.css'
import 'aos/dist/aos.css'

import AOS from 'aos'
import type { AppProps } from 'next/app'
import { GlobalStateProvider } from '../hooks/client/useGlobalState'
import Layout from '../components/Layout'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    })
  }, [])

  return (
    <GlobalStateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalStateProvider>
  )
}

export default MyApp