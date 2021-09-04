import { Express } from 'express'
import multer from 'multer'

export const upload = multer({ storage: multer.memoryStorage() })

export function configureMulter(app: Express) {
  // no configuration required for this middleware
}
