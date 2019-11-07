const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  itemQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  itemPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0
    }
  }
})

module.exports = OrderProduct
