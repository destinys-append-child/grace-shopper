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

// router.get('/confirmation', async (req, res, next) => {
//   try {
//     const confirmed = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         isPurchased: false
//       }
//     })
//     confirmed.update({isPurchased: true})
//     confirmed.update({billing: req.body.billingAddress})
//     res.send(confirmed)
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/confirmation', async (req, res, next) => {
  try {
    const confirmed = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      }
    })
    confirmed.update({isPurchased: true})
    console.log('BODDDDDDY', req.body)
    // const {shippingAddress, billingAddress} = req.body;
    confirmed.update({
      shipping: req.body.shippingAddress,
      billing: req.body.billingAddress
    })

    res.send(confirmed)
  } catch (error) {
    next(error)
  }
})
