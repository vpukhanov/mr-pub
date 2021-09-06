import { Diff, Hunk, File } from 'react-diff-view'

import s from './single-file-diff.module.css'

import 'react-diff-view/style/index.css'

type SingleFileDiffProps = {
  file: File
}

function SingleFileDiff({ file }: SingleFileDiffProps) {
  const { oldRevision, newRevision, type, hunks, oldPath, newPath } = file
  return (
    <div className={s.container}>
      <div className={s.filename}>
        {oldPath === newPath ? newPath : `${oldPath} → ${newPath}`}
      </div>
      <Diff
        key={oldRevision + '-' + newRevision}
        viewType='unified'
        diffType={type}
        hunks={hunks}>
        {(hunks) =>
          hunks.flatMap((hunk) => (
            <Hunk key={'hunk-' + hunk.content} hunk={hunk} />
          ))
        }
      </Diff>
    </div>
  )
}

export default SingleFileDiff
