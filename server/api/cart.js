const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {isUser} = require('../../utils')
module.exports = router

// GET /api/cart
// Pull from orders table where isPurchased is false
router.get('/', isUser, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product}]
    })
    if (cart) res.send(cart)
    else res.send(`No items in cart`)
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/:productId
// Update the quantity of items in cart
router.put('/', isUser, async (req, res, next) => {
  try {
    const {productId, quantity} = req.body
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product, where: {id: productId}}]
    })
    if (order) {
      const product = order.products[0]
      const orderItem = product.orderProduct
      if (product.quantity >= quantity && quantity >= 1) {
        const currentItemCost = orderItem.itemQty * orderItem.itemPrice
        const updatedItemCost = quantity * orderItem.itemPrice
        const newTotal = order.orderCost + (updatedItemCost - currentItemCost)
        await order.update({orderCost: newTotal})
        await orderItem.update({itemQty: quantity})
      }
      const updatedOrder = await Order.findByPk(order.id, {
        include: [{model: Product}]
      })
      res.send(updatedOrder)
    } else {
      res.status(404).send(`Cannot find order`)
    }
  } catch (err) {
    next(err)
  }
})