import { GetServerSidePropsContext, NextPageContext } from 'next'
import Head from 'next/head'
import { SERVER_HOST } from '../components/constants'

type ViewDiffPageProps = {
  diff: string
}

function ViewDiffPage({ diff }: ViewDiffPageProps) {
  console.log(diff)
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='crossOrigin'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <title>Mr. Pub | Collaborate on diffs</title>
      </Head>
      <div>
        <div>Diff view and collaboration is under construction</div>
        <pre>
          <code>${diff}</code>
        </pre>
      </div>
    </>
  )
}

export default ViewDiffPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const downloader = await fetch(
    `${SERVER_HOST}/download-diff/${context.params?.uuid}`,
  )
  const diff = await downloader.text()

  if (downloader.status === 404) {
    return {
      notFound: true,
    }
  }

  return {
    props: { diff },
  }
}
