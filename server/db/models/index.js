//const db = require('..')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')
const OrderDetail = require('./orderDetail')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Cart.belongsTo(User)
User.hasMany(Cart)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  //db,
  User,
  Product,
  Cart,
  Order,
  OrderDetail
}
