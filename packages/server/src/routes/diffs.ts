import { Express } from 'express'
import { createFileReadStream, fileExists } from '../controllers/download'
import { validateFile, uploadFile } from '../controllers/upload'
import { upload } from '../middleware/multer'

export function configureDiffRoutes(app: Express) {
  // GET[uuid]: Download a diff
  app.get('/diffs/:uuid', async (req, res) => {
    const { uuid } = req.params

    if (!(await fileExists(uuid))) {
      res.status(404).end('Diff not found')
      return
    }

    res.status(200).contentType('text/x-diff')
    createFileReadStream(uuid).pipe(res, { end: true })
  })

  // POST[diff={file}]: Upload a diff
  app.post('/diffs', upload.single('diff'), async ({ file }, res) => {
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
