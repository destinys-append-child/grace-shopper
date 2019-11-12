const router = require('express').Router()
const {Product, Order, OrderProduct} = require('../db/models')
const utils = require('../../utils')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      res.send(product)
    } else {
      res.status(404).send("OOF,couldn't find that")
    }
  } catch (error) {
    next(error)
  }
})
