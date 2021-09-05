import s from './upload-diff-form.module.css'

function UploadDiffForm() {
  return (
    <form className={s.container}>
      <label>Upload a file</label>
      <input id='diff' name='diff' type='file' required />
      <button type='submit'>Upload</button>
    </form>
  )
}

export default UploadDiffForm
