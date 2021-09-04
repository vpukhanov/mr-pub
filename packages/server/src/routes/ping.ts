import { Express } from 'express'

export function configurePingRoute(app: Express) {
  app.get('/ping', (req, res) => {
    res.status(200).end('pong')
  })
}
