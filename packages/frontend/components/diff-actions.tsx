import s from './diff-actions.module.css'

type DiffActionsProps = {
  owner: boolean
}

function DiffActions({ owner }: DiffActionsProps) {
  return (
    <div className={s.container}>
      {owner && <button className='button-danger'>Delete Diff</button>}
    </div>
  )
}

export default DiffActions
