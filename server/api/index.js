const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./singleProduct'))
router.use('/carts', require('./carts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})
