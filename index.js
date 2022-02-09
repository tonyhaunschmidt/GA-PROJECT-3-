import express from 'express'
import mongoose from 'mongoose'
import router from './config/routes.js'
import { port, dbURI } from './config/environment.js'

const app = express()


const startServer = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Mongodb connected')

    app.use(express.json())

    app.use((req, _res, next) => {
      console.log(`Request received: ${req.method} - ${req.url}`) 
      next()
    })

    app.use(router)

    app.use((_req, res) => {
      return res.status(404).json({ message: 'Route Not Found' })
    })

    app.listen(port, () => console.log(`Server listening on port ${port}`))
  } catch (err) {
    console.log(err)
  }
}
startServer()