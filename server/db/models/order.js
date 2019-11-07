const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderCost: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0
    }
  },
  shipping: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  billing: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Order
