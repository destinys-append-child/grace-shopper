const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

// generate a cart-like object for guests
router.post('/not-purchased/guest', async (req, res, next) => {
  try {
    let cost = 0
    let products = await Product.findAll()
      .filter(product => {
        return !!req.body[product.id]
      })
      .map(product => {
        const quantity = req.body[product.id]
        cost += product.price * quantity
        product.dataValues.orderProduct = {
          itemQty: quantity,
          itemPrice: product.price
        }
        return product
      })
    let cart = {
      id: 'guest',
      orderCost: cost,
      shipping: null,
      billing: null,
      isPurchased: false,
      userId: null,
      products
    }
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// delete item in cart for logged in user
router.delete('/not-purchased/remove/:productId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).send(`Must login to remove item from cart`)
    }
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
        const orderItem = product.orderProduct
        const quantity = orderItem.itemQty
        await orderItem.destroy()
        const newTotal = order.orderCost - product.price * quantity
        await order.update({orderCost: newTotal})
        const updatedOrder = await Order.findByPk(order.id, {
          include: [{model: Product}]
        })
        // Using 201 because the order was updated
        res.status(201).send(updatedOrder)
      } else {
        res.status(404).send(`Cannot find product in order`)
      }
    } else {
      res.status(404).send(`Unable to remove from cart productId: ${productId}`)
    }
  } catch (err) {
    next(err)
  }
})

// GET Order History for logged in user
router.get('/purchased', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).send(`Must login to get order history`)
    }
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
