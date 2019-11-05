const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: Sequelize.INTEGER
})

module.exports = Cart
