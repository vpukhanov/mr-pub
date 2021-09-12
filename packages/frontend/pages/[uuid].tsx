import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { SERVER_HOST } from '../components/constants'
import DiffActions from '../components/diff-actions'
import DiffViewer from '../components/diff-viewer'
import MonocleHeader from '../components/monocle-header'
import SharedFooter from '../components/shared-footer'

import s from './[uuid].module.css'

type ViewDiffPageProps = {
  uuid: string
  diff: string
  owner: boolean
}

function ViewDiffPage({ uuid, diff, owner }: ViewDiffPageProps) {
  const router = useRouter()

  const onFileDeleted = () => {
    router.push('/')
  }

  return (
    <div className={s.container}>
      <MonocleHeader link />
      <DiffViewer diff={diff} />
      <DiffActions uuid={uuid} owner={owner} onFileDeleted={onFileDeleted} />
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
  const uuid = context.params?.uuid
  const downloader = await fetch(`${SERVER_HOST}/diffs/${uuid}`, {
    // @ts-ignore
    headers: {
      Cookie: context.req.headers.cookie,
    },
  })

  if (downloader.status === 404) {
    return {
      notFound: true,
    }
  }

  const diff = await downloader.text()
  const owner = downloader.headers.get('x-is-owner') === 'true'

  return {
    props: { diff, owner, uuid },
  }
}
