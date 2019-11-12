const router = require('express').Router()
const {Product, Order, OrderProduct} = require('../db/models')
const utils = require('../../utils')
module.exports = router

// GET /api/products
// optional ?category=categoryName filter
// Get all products
router.get('/', async (req, res, next) => {
  try {
    const category = req.query.category
    let products
    if (category) {
      products = await Product.findAll({
        where: {
          category: category
        }
      })
      res.send(category)
    } else {
      products = await Product.findAll()
    }
    if (products) {
      res.json(products)
    } else {
      res.status(404).send(`Cannot get products`)
    }
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:productId
// Get a single product
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (product) {
      res.send(product)
    } else {
      res.status(404).send("OOF,couldn't find that")
    }
  } catch (error) {
    next(error)
  }
})
