import { FormEvent, useState } from 'react'
import { SERVER_HOST } from './constants'
import s from './upload-diff-form.module.css'

type UploadDiffFormProps = {
  onFileUploaded(id: string): void
}

function UploadDiffForm({ onFileUploaded }: UploadDiffFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const diffFile = (event.target as HTMLFormElement).diff?.files[0]

    if (isSubmitting || !diffFile) {
      return
    }
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('diff', diffFile)

    const res = await fetch(`${SERVER_HOST}/upload-diff`, {
      method: 'POST',
      body: formData,
    })

    if (res.status === 200) {
      const id = await res.text()
      onFileUploaded(id)
    } else {
      alert(`todo error: ${await res.text()}`)
    }

    setIsSubmitting(false)
  }

  return (
    <form
      className={s.container}
      method='POST'
      encType='multipart/form-data'
      onSubmit={onSubmit}>
      <label>Upload a file</label>
      <input id='diff' name='diff' type='file' required />
      <button type='submit' disabled={isSubmitting}>
        Upload
      </button>
    </form>
  )
}

export default UploadDiffForm
