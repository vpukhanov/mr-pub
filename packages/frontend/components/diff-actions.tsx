import { SERVER_HOST } from './constants'
import s from './diff-actions.module.css'

type DiffActionsProps = {
  uuid: string
  owner: boolean

  onFileDeleted(): void
}

function DiffActions({ uuid, owner, onFileDeleted }: DiffActionsProps) {
  const onDelete = async () => {
    const res = await fetch(`${SERVER_HOST}/diffs/${uuid}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.status === 204) {
      onFileDeleted()
    } else {
      alert(`error: ${await res.text()}`)
    }
  }

  return (
    <div className={s.container}>
      {owner && (
        <button className='button-danger' onClick={onDelete}>
          Delete Diff
        </button>
      )}
    </div>
  )
}

export default DiffActions
