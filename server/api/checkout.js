const router = require('express').Router()
const {Order} = require('../db/models')
const {isUser, sendEmail} = require('../../utils')
module.exports = router
const nodemailer = require('nodemailer')

router.get('/', isUser, async (req, res, next) => {
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

router.get('/confirmation', isUser, async (req, res, next) => {
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

router.put(
  '/confirmation',
  isUser,
  async (req, res, next) => {
    try {
      const confirmed = await Order.findOne({
        where: {
          userId: req.user.id,
          isPurchased: false
        }
      })

      console.log('BODDDDDDY', req.body)
      const {shipping, billing} = req.body
      let updates = {}
      if (shipping) {
        updates.shipping = shipping
      }
      if (billing) {
        updates.billing = billing
      }
      if (updates.shipping || updates.billing) {
        confirmed.update(updates)
      }

      res.send(confirmed)
      next()
    } catch (error) {
      next(error)
    }
  },
  sendEmail
)
