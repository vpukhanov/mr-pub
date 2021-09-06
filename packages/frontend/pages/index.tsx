import { useRouter } from 'next/router'
import MonocleHeader from '../components/monocle-header'
import UploadDiffForm from '../components/upload-diff-form'

import s from './index.module.css'

function IndexPage() {
  const router = useRouter()

  const onFileUploaded = (id: string) => {
    router.push(`/${id}`)
  }

  return (
    <div className={s.centeredContainer}>
      <MonocleHeader />
      <main className={s.main}>
        <div className={s.tagline}>
          Collaborate&nbsp;on the&nbsp;review of&nbsp;diffs:
          merge-&nbsp;and&nbsp;pull- requests, patch files.
        </div>
        <UploadDiffForm onFileUploaded={onFileUploaded} />
      </main>
      <footer className={s.footer}>
        <div className={s.tagline}>made with 🦄</div>
        <div className={s.tagline}>
          <a href='https://github.com/vpukhanov/mr-pub'>view on github</a>
        </div>
      </footer>
    </div>
  )
}

export default IndexPage
