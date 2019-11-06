const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    if (products) {
      res.json(products)
    } else {
      res.send('COULD NOT GET ALL PRODUCTS').status(404)
    }
  } catch (error) {
    next(error)
  }
})
router.get('/:categoryName', async (req, res, next) => {
  try {
    const singleCategory = await Product.findOne({
      where: {
        category: req.params.categoryName
      }
    })
    if (singleCategory) {
      res.json(singleCategory)
    } else {
      res.send('COULD NOT GET SINGLE CATEGORY').status(404)
    }
  } catch (error) {
    next(error)
  }
})
