import { useMemo } from 'react'
import { parseDiff } from 'react-diff-view'
import SingleFileDiff from './diff-viewer/single-file-diff'

type DiffViewerProps = {
  diff: string
}

function DiffViewer({ diff }: DiffViewerProps) {
  const files = useMemo(() => parseDiff(diff), [diff])
  return (
    <>
      {files.map((file) => (
        <SingleFileDiff
          key={file.oldRevision + '-' + file.newRevision}
          file={file}
        />
      ))}
    </>
  )
}

export default DiffViewer
