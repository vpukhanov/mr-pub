import { Express } from 'express'
import { createFileReadStream, fileExists } from '../controllers/download'

export function configureDownloadDiffRoute(app: Express) {
  app.get('/download-diff/:uuid', async (req, res) => {
    const { uuid } = req.params

    if (!(await fileExists(uuid))) {
      res.status(404).end('Diff not found')
      return
    }

    res.status(200).contentType('text/x-diff')
    createFileReadStream(uuid).pipe(res, { end: true })
  })
}
