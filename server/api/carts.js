/*const router = require('express').Router()
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
    if (cart) res.send(cart)
    else res.status(404).send(`No items in cart`)
  } catch (err) {
    next(err)
  }
})

// update cart_qty of item in cart for logged in user
router.put('/:cartId', async (req, res, next) => {
  try {
    const {quantity} = req.body
    const cartItem = await Cart.findByPk(req.params.cartId)
    if (cartItem && quantity) {
      await cartItem.update({cart_qty: quantity})
      res.status(201).send(cartItem)
    } else {
      res
        .status(404)
        .send(`Unable to update cart_qty for cartId: ${req.params.cartId}`)
    }
  } catch (err) {
    next(err)
  }
})

// delete item in cart for logged in user
router.delete('/:cartId', async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}) */
