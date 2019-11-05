const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('carts', {
  productQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Cart
