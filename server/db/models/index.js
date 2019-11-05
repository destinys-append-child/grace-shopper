const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderDetail = require('./orderDetail')
const Cart = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Cart.belongsTo(User)
User.hasMany(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)

Order.belongsTo(User)
User.hasMany(Order)

OrderDetail.belongsTo(Order)
Order.hasMany(OrderDetail)

OrderDetail.belongsTo(Product)
Product.hasMany(OrderDetail)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Cart,
  Order,
  OrderDetail
}
