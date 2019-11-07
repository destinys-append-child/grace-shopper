const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

// get cart for logged in users
// pull from orders table where isPurchased is false
router.get('/not-purchased', async (req, res, next) => {
  try {
    // should only be one cart per userId at a time
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product}]
    })
    if (cart) res.send(cart)
    else res.status(404).send(`No items in cart`)
  } catch (err) {
    next(err)
  }
})

// update itemQty of item in cart for logged in user
router.put('/not-purchased', async (req, res, next) => {
  try {
    const {productId, quantity} = req.body
    // step one: confirm there is an orderId for the user
    // that has not been purchased
    // that contains the productId that should be updated
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product, where: {id: productId}}]
    })
    if (order && quantity) {
      const orderItem = order.products[0].orderProduct
      await orderItem.update({itemQty: quantity})
      res.status(201).send(order)
    } else {
      res
        .status(404)
        .send(`Unable to update itemQty for productId: ${productId}`)
    }
  } catch (err) {
    next(err)
  }
})

// delete item in cart for logged in user
router.delete('/not-purchased/:productId', async (req, res, next) => {
  try {
    const {productId} = req.params
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product}]
    })
    if (order) {
      res.send(order)
    } else {
      res.status(404).send(`Unable to remove from cart productId: ${productId}`)
    }
  } catch (err) {
    next(err)
  }
})
