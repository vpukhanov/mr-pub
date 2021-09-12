import { Express } from 'express'
import cookieParser from 'cookie-parser'

const COOKIE_SECRET = process.env.COOKIE_SECRET ?? 'secret'

export function configureCookieParserMiddleware(app: Express) {
  app.use(cookieParser(COOKIE_SECRET))
}
