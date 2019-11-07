/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('order-product')

describe('OrderProduct model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('instanceMethods', () => {})
})
