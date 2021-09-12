import { Express } from 'express'
import { configureCorsMiddleware } from './cors'
import { configureCookieParserMiddleware } from './cookie-parser'

export function configureMiddleware(app: Express) {
  configureCorsMiddleware(app)
  configureCookieParserMiddleware(app)
}
