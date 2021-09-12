import { GetServerSidePropsContext } from 'next'
import { SERVER_HOST } from '../components/constants'
import DiffViewer from '../components/diff-viewer'
import MonocleHeader from '../components/monocle-header'
import SharedFooter from '../components/shared-footer'

import s from './[uuid].module.css'

type ViewDiffPageProps = {
  diff: string
}

function ViewDiffPage({ diff }: ViewDiffPageProps) {
  return (
    <div className={s.container}>
      <MonocleHeader link />
      <DiffViewer diff={diff} />
      <SharedFooter>
        <div className={s.footnote}>
          Collaboration features are under construction
        </div>
      </SharedFooter>
    </div>
  )
}

export default ViewDiffPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const downloader = await fetch(
    `${SERVER_HOST}/diffs/${context.params?.uuid}`,
    {
      // @ts-ignore
      headers: {
        Cookie: context.req.headers.cookie,
      },
    },
  )

  if (downloader.status === 404) {
    return {
      notFound: true,
    }
  }

  const diff = await downloader.text()

  return {
    props: { diff },
  }
}
