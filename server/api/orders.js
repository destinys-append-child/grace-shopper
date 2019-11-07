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
router.put('/not-purchased/increase/:productId', async (req, res, next) => {
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
      const product = order.products.find(item => item.id === productId)
      if (product) {
        orderItem = product.orderProduct
        const newAmount = orderItem.itemQty + 1
        await orderItem.update({itemQty: newAmount})
        res.send(order)
      } else {
        res.status(404).send(`Cannot find product in order`)
      }
    } else {
      res.status(404).send(`Cannot find order`)
    }
  } catch (err) {
    next(err)
  }
})

// decrease by 1 itemQty of item in cart for logged in user
router.put('/not-purchased/decrease/:productId', async (req, res, next) => {
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
      const product = order.products.find(item => item.id === productId)
      if (product) {
        orderItem = product.orderProduct
        const newAmount = orderItem.itemQty - 1
        if (newAmount >= 1) {
          await orderItem.update({itemQty: newAmount})
          res.send(order)
        } else {
          res
            .status(405)
            .send(
              `Cannot decrease amount less than 1. Suggest removing instead.`
            )
        }
      } else {
        res.status(404).send(`Cannot find product in order`)
      }
    } else {
      res.status(404).send(`Cannot find order`)
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
