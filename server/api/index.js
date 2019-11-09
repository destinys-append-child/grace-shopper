const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/products', require('./singleProduct'))
router.use('/categories', require('./categories'))
router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})
module.exports = router
