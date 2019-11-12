const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const checkout = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      }
    })
    if (checkout) {
      res.send(checkout)
    } else {
      res.status(403).send('No items to checkout')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/confirmation', async (req, res, next) => {
  try {
    const confirmed = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      }
    })
    confirmed.update({isPurchased: true})

    res.send(confirmed)
  } catch (error) {
    next(error)
  }
})

router.put('/confirmation', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(404).send('MUST HAVE ACCOUNT FIRST')
    }
    const confirmed = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      }
    })
    // confirmed.update({isPurchased: true})
    console.log('BODDDDDDY', req.body)
    const {shipping, billing} = req.body
    confirmed.update({
      // isPurchased: true,
      shipping: shipping,
      billing: billing
    })

    res.send(confirmed)
  } catch (error) {
    next(error)
  }
})
