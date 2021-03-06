/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysFirstName = 'Cody'
    const codysLastName = 'Pug'
    const codysEmail = 'cody@puppybook.com'
    const codysPassword = '12345'

    beforeEach(() => {
      return User.create({
        firstName: codysFirstName,
        lastName: codysLastName,
        email: codysEmail,
        password: codysPassword,
        isAdmin: true
      })
    })

    it('GET /api/users', async () => {
      const authenticatedUser = request.agent(app)
      await authenticatedUser
        .post('/auth/login')
        .send({email: codysEmail, password: codysPassword})
        .expect(200)

      const res = await authenticatedUser.get('/api/users').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
/* global describe beforeEach it */
