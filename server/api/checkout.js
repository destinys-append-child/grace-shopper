const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
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

// router.put('/confirmation', async (req, res, next) => {

//     try {
//         let updated = await Order.update({
//             isPurchased: true

//         }, {
//             where: {
//                 userId: req.user.id,
//                 isPurchased: false
//               },
//             returning: true, // needed for affectedRows to be populated
//             plain: true
//         });
//         if (updated) {
//             res.send(updated)
//         }else{
//             res.status(404).send('Order can not be completed')
//         }
//     } catch (error) {
//         next(error)
//     }
// })
