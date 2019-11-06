const router = require('express').Router()
const {Cart, Product} = require('../db/models')
module.exports = router

// get items in cart for logged in user
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {userId: req.user.id},
      include: [{model: Product}],
      attributes: ['id', 'cart_qty', 'productId']
    })
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

// add items to cart for logged in user
router.post()
