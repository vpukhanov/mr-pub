import { Express } from 'express'
import cors from 'cors'

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? [
          'https://adepti.mister.pub',
          'https://mister.pub',
          'http://adepti.mister.pub',
          'http://mister.pub',
        ]
      : 'http://localhost:4000',
}

export function configureCorsMiddleware(app: Express) {
  app.use(cors(corsOptions))
}
