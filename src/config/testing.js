import dotenv from 'dotenv'
dotenv.config()

export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET
  },
  dbUrl: process.env.TEST_MONGODB_URI
}
