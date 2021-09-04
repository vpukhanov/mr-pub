import { Express } from 'express'
import { configureMulter } from './multer'

export function configureMiddleware(app: Express) {
  configureMulter(app)
}
