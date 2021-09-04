import { Express } from 'express'
import { validateFile } from '../controllers/upload'
import { upload } from '../middleware/multer'

export function configureUploadDiffRoute(app: Express) {
  app.post('/upload-diff', upload.single('diff'), (req, res) => {
    validateFile(req.file)
  })
}
