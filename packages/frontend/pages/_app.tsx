import type { AppProps } from 'next/app'
import Head from 'next/head'

import './_app.css'

function MyApp({ Component, pageProps }: AppProps) {
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
