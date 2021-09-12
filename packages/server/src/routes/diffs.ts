import { Express } from 'express'
import { createFileReadStream, fileExists } from '../controllers/download'
import { createOwnerToken, tokenOwnsId } from '../controllers/jwt'
import { validateFile, uploadFile } from '../controllers/upload'
import { upload } from '../middleware/multer'

export function configureDiffRoutes(app: Express) {
  // GET[uuid]: Download a diff
  app.get('/diffs/:uuid', async (req, res) => {
    const { cookies } = req
    const { uuid } = req.params

    if (!(await fileExists(uuid))) {
      res.status(404).end('Diff not found')
      return
    }

    const isOwner = await tokenOwnsId(cookies['ownerToken'], uuid)

    res
      .status(200)
      .contentType('text/x-diff')
      .header('X-Is-Owner', String(isOwner))

    createFileReadStream(uuid).pipe(res, { end: true })
  })

  // POST[diff={file}]: Upload a diff
  app.post('/diffs', upload.single('diff'), async ({ file, cookies }, res) => {
    const err = validateFile(file)
    if (err instanceof Error) {
      console.error(err)
      res.status(500).end(err.message)
      return
    }
    const id = await uploadFile(file)
    const ownerToken = await createOwnerToken(id, cookies['ownerToken'])
    res.status(200).cookie('ownerToken', ownerToken).end(id)
  })
}
