import { Express } from 'express'
import { createFileReadStream, fileExists } from '../controllers/download'
import {
  createOwnerToken,
  deleteOwnerToken,
  tokenOwnsId,
} from '../controllers/jwt'
import { validateFile, uploadFile, deleteFile } from '../controllers/upload'
import { upload } from '../middleware/multer'

export function configureDiffRoutes(app: Express) {
  // GET[uuid]: Download a diff
  app.get('/diffs/:uuid', async (req, res) => {
    const { cookies } = req
    const { uuid } = req.params

    const exists = await fileExists(uuid)
    if (!exists) {
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

  // DELETE[uuid]: Delete a UUID
  app.delete('/diffs/:uuid', async (req, res) => {
    const { cookies } = req
    const { uuid } = req.params

    const isOwner = await tokenOwnsId(cookies['ownerToken'], uuid)
    if (!isOwner) {
      res
        .status(401)
        .header(
          'WWW-Authenticate',
          'Bearer realm="Ownership of specified resource"',
        )
        .end('Unauthorized')
    }

    const exists = await fileExists(uuid)
    if (!exists) {
      res.status(404).end('Diff not found')
      return
    }

    await deleteFile(uuid)

    const ownerToken = await deleteOwnerToken(uuid, cookies['ownerToken'])
    res.status(204).cookie('ownerToken', ownerToken).end('No Content')
  })
}
