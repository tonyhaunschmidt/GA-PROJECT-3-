import express from 'express'
import mongoose from 'mongoose'
import router from './config/routes.js'
import { port, dbURI } from './config/environment.js'

import 'dotenv/config' // only needs to be added if it doesn't already exist
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express()

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Mongodb connected')

    app.use(express.json())

    app.use((req, _res, next) => {
      console.log(`Request received: ${req.method} - ${req.url}`)
      next()
    })

    app.use('/api', router)

    app.use(express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

    app.use((_req, res) => {
      return res.status(404).json({ message: 'Route Not Found' })
    })

    app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))
  } catch (err) {
    console.log(err)
  }
}
startServer()