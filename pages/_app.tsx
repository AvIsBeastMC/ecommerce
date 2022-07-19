import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import AOS from 'aos'
import { useEffect } from 'react'
import 'aos/dist/aos.css'
import { GlobalStateProvider } from '../hooks/useGlobalState'

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