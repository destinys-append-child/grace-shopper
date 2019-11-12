const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {isUser} = require('../../utils')
module.exports = router

// GET /api/orders
// Order History for logged in user
router.get('/', isUser, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        isPurchased: true
      },
      include: [{model: Product}]
    })
    if (orders) res.send(orders)
    else res.send(`No past orders`)
  } catch (err) {
    next(err)
  }
})
