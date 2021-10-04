import supertest from 'supertest'
import { app } from '../server'
import { User } from '../resources/user/user.model'
import { newToken } from '../utils/auth'
import mongoose from 'mongoose'

const api = supertest(app)

describe('API Authentication:', () => {
  // eslint-disable-next-line no-unused-vars
  let token

  beforeEach(async () => {
    const user = await User.create({
      email: 'camariana@camariana.gm',
      password: 'secret'
    })
    token = newToken(user)
  })

  describe('api auth', () => {
    test('api should be locked down', async () => {
      let response = await api.get('/api/user')
      expect(response.statusCode).toBe(401)
    })

    test('passes with JWT', async () => {
      const jwt = `Bearer ${token}`
      const id = mongoose.Types.ObjectId()
    })
  })
})