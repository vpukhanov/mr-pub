import { Express } from 'express'
import { configureCorsMiddleware } from './cors'

export function configureMiddleware(app: Express) {
  configureCorsMiddleware(app)
}
