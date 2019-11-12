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

// GET /api/orders
// Order History for logged in user
router.get('/', async (req, res, next) => {
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
