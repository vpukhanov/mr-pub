import { Express } from 'express'
import { configurePingRoute } from './ping'
import { configureUploadDiffRoute } from './upload-diff'

export function configureRoutes(app: Express) {
  configurePingRoute(app)
  configureUploadDiffRoute(app)
}
