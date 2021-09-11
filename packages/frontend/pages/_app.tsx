import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GA_TRACKING_ID } from '../components/constants'

import './_app.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) =>
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      })
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      <Head>
        <title>Mr. Pub | Collaborate on diffs</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
