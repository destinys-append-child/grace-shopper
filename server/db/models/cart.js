const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quanitity: Sequelize.INTEGER
})

module.exports = Cart
