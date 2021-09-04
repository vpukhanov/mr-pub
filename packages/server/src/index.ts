import express from 'express'
import { configureRoutes } from './routes'

const PORT = process.env.PORT ?? 3000

const app = express()
configureRoutes(app)
app.listen(PORT, () => {
  console.log(`@mr-pub/server listening on port ${PORT}`)
})
