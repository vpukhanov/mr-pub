import { Express } from 'express'
import { getDiffFromFile, uploadFile } from '../controllers/upload'
import { upload } from '../middleware/multer'

export function configureUploadDiffRoute(app: Express) {
  app.post('/upload-diff', upload.single('diff'), async ({ file }, res) => {
    getDiffFromFile(file) // call this for validation purposes
    const id = await uploadFile(file)
    res.status(200).end(id)
  })
}
