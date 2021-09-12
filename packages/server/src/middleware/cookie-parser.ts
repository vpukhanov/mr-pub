import { Express } from 'express'
import cookieParser from 'cookie-parser'

export function configureCookieParserMiddleware(app: Express) {
  app.use(cookieParser())
}
