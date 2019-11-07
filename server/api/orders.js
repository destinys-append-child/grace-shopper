const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

// get cart for logged in users
// pull from orders table where isPurchased is false
router.get('/not-purchased', async (req, res, next) => {
  try {
    // should only be one cart per userId at a time
    if (!req.user) {
      res.status(401).send(`Must login to get cart`)
    }
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product}]
    })
    if (cart) res.send(cart)
    else res.status(403).send(`No items in cart`)
  } catch (err) {
    next(err)
  }
})

// increase by 1 itemQty of item in cart for logged in user
router.put('/not-purchased/increase', async (req, res, next) => {
  try {
    const {productId} = req.body
    // step one: confirm there is an orderId for the user
    // step two: confirm the order has not been purchased
    // step three: confirm order contains the productId
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product, where: {id: productId}}]
    })
    if (order) {
      const orderItem = order.products[0].orderProduct
      const amount = orderItem.itemQty + 1
      await orderItem.update({itemQty: amount})
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

router.put('/not-purchased/decrease', async (req, res, next) => {
  try {
    const {productId} = req.body
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product, where: {id: productId}}]
    })
    if (order) {
      const orderItem = order.products[0].orderProduct
      const amount = orderItem.itemQty - 1
      if (amount >= 1) {
        await orderItem.update({itemQty: amount})
        res.status(201).send(order)
      } else {
        res.send(
          `Cannot decrease itemQty < 1. Suggest removing product instead.`
        )
      }
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
router.delete('/not-purchased/remove/:productId', async (req, res, next) => {
  try {
    let {productId} = req.params
    productId = Number(productId)
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product}]
    })
    if (order) {
      const orderItem = order.products.find(item => item.id === productId)
        .orderProduct
      await orderItem.destroy()
      // Need to figure out how to send back updated cart,
      // so that no refresh is required
      res.sendStatus(204)
    } else {
      res.status(404).send(`Unable to remove from cart productId: ${productId}`)
    }
  } catch (err) {
    next(err)
  }
})
