/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Quantity update', () => {
    beforeEach(async () => {
      let newCartItem = await Cart.create({
        quantity: 1,
        productId: 2,
        userId: 2
      })
    })

    //check that a cart has a valid productId and userId
    //ex newCartItem.productId.name = 'AQUARIUS'
    //ex newCartItem.userId.name = 'Logan'
  })
}) // end describe('Cart model');
