import { Express } from 'express'
import { configurePingRoute } from './ping'

export function configureRoutes(app: Express) {
  configurePingRoute(app)
}
