const router = require('express').Router()
const {Cart, Product} = require('../db/models')
module.exports = router

// get cart based on
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {userId: req.user.id},
      include: [{model: Product}]
    })
    const cartItems = cart.map(cartRow => cartRow.product)
    res.send(cartItems)
  } catch (err) {
    next(err)
  }
})
