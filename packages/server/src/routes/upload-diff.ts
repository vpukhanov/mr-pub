import { Express } from 'express'
import { validateFile, uploadFile } from '../controllers/upload'
import { upload } from '../middleware/multer'

export function configureUploadDiffRoute(app: Express) {
  app.post('/upload-diff', upload.single('diff'), async ({ file }, res) => {
    const err = validateFile(file)
    if (err instanceof Error) {
      console.error(err)
      res.status(500).end(err.message)
      return
    }
    const id = await uploadFile(file)
    res.status(200).end(id)
  })
}
