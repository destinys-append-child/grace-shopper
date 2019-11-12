/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Product = db.model('product')

describe('Cart routes', () => {
  const codysFirstName = 'Cody'
  const codysLastName = 'Pug'
  const codysEmail = 'cody@puppybook.com'
  const codysPassword = '12345'

  const testOrderCost = 1000
  const testShipping = '123 Test Lane, New York, NY'
  const testBilling = '456 Test Rd, New York, NY'

  const yachtName = 'Test Yacht'
  const yachtImageUrl =
    'https://s3.amazonaws.com/boss.yatco.com/ForSale/Vessel/Photo/250672/medium_2591789.jpg'
  const yachtDescription = 'This is a description'
  const yachtPrice = 1000
  const yachtAvgRating = 4
  const yachtQuantity = 10
  const yachtCategory = 'test category'

  beforeEach(async () => {
    await db.sync({force: true})
    const user = await User.create({
      firstName: codysFirstName,
      lastName: codysLastName,
      email: codysEmail,
      password: codysPassword
    })
    await Product.create({
      name: yachtName,
      imageUrl: yachtImageUrl,
      description: yachtDescription,
      price: yachtPrice,
      avgRating: yachtAvgRating,
      quantity: yachtQuantity,
      category: yachtCategory
    })
    return Order.create({
      orderCost: testOrderCost,
      shipping: testShipping,
      billing: testBilling,
      userId: user.id
    })
  })

  describe('/api/cart', () => {
    it('GET /api/cart', async () => {
      const authenticatedUser = request.agent(app)
      await authenticatedUser
        .post('/auth/login')
        .send({email: codysEmail, password: codysPassword})
        .expect(200)
      const res = await authenticatedUser.get('/api/cart').expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.orderCost).to.be.equal(testOrderCost)
      expect(res.body.shipping).to.be.equal(testShipping)
      expect(res.body.billing).to.be.equal(testBilling)
    })
  })
})
