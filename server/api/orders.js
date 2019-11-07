const router = require('express').Router()
const {Order, Product} = require('../db/models')
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
    const {orderId, productId, quantity} = req.body
    const orderItem = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product, where: {id: productId}}]
    })
    if (orderItem && quantity) {
      res.status(201).send(orderItem)
    } else {
      res
        .status(404)
        .send(
          `Unable to update itemQty for orderId: ${orderId} and productId: ${productId}`
        )
    }
  } catch (err) {
    next(err)
  }
})

// delete item in cart for logged in user
/*
router.delete('/:cartId', async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
})
*/
