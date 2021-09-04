import { Express } from 'express'
import { getDiffFromFile } from '../controllers/upload'
import { upload } from '../middleware/multer'

export function configureUploadDiffRoute(app: Express) {
  app.post('/upload-diff', upload.single('diff'), (req, res) => {
    const diff = getDiffFromFile(req.file)
    res.status(200).json(diff)
  })
}
