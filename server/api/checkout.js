const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router
const nodemailer = require('nodemailer')
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

router.post('/confirmation', async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PASS
    }
  })
  const mailOptions = {
    from: process.env.NODEMAIL_EMAIL,
    to: req.body.email,
    subject: `It\'s All Smooth Sailing From Here ${req.user.firstName} 😎`,
    // html:<p>

    // </p>,
    text: `Look, not every one can be a winner.Fortunately, that has absolutely nothing to do with you!(Because you are a winner)Congrats on that new 👏FAT👏ASS👏YACHT!`,
    replyTo: ''
  }

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error('email couldnt send', err)
    } else {
      console.log('email sent', res)
    }
  })
  res.send('SENT')
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
