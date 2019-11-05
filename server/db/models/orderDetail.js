const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetail', {
  detailQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  detailPrice: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = OrderDetail
