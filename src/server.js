import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
//import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/connect'
import middleware from './utils/middleware'
import logger from './utils/logger'

import userRouter from './resources/user/user.router'
// import studentRouter from './resources/student/student.router.js'

export const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// app.post('/signup', signup)
// app.post('/signin', signin)

// app.use('/api', protect)
app.use('/api/user', userRouter)
// app.use('/api/student', studentRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      logger.info(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (error) {
    logger.error('error connecting to database:', error.message)
  }
}