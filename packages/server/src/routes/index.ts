import { Express } from 'express'
import { configureDiffRoutes } from './diffs'
import { configurePingRoute } from './ping'

export function configureRoutes(app: Express) {
  configurePingRoute(app)
  configureDiffRoutes(app)
}
