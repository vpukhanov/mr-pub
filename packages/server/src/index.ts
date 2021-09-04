import express from 'express'
import { createLightship } from 'lightship'
import { configureRoutes } from './routes'

const PORT = Number(process.env.PORT) || 3000
const LIGHTSHIP_PORT = Number(process.env.LIGHTSHIP_PORT) || 9000

const app = express()
const lightship = createLightship({ port: LIGHTSHIP_PORT })

configureRoutes(app)

const server = app
  .listen(PORT, () => {
    console.log(`@mr-pub/server listening on port ${PORT}`)
    lightship.signalReady()
  })
  .on('error', () => {
    lightship.shutdown()
  })

lightship.registerShutdownHandler(() => {
  server.close()
})
