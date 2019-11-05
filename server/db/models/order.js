const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shipping: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billing: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  totalCost: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order