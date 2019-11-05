/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
//WILL NEED TESTS ONLY WHEN ADMIN EDITS PRODUCTS
  describe('instanceMethods', () => {
  })
}) // end describe('User model');
