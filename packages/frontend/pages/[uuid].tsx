import { GetServerSidePropsContext } from 'next'
import { SERVER_HOST } from '../components/constants'
import DiffViewer from '../components/diff-viewer'

type ViewDiffPageProps = {
  diff: string
}

function ViewDiffPage({ diff }: ViewDiffPageProps) {
  return (
    <div>
      <div>Diff view and collaboration is under construction</div>
      <DiffViewer diff={diff} />
    </div>
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
