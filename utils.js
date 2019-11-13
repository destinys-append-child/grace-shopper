const nodemailer = require('nodemailer')

const isUser = (req, res, next) => {
  try {
    if (req.user) next()
    else res.status(403).send('Must login to access')
  } catch (err) {
    next(err)
  }
}
const isAdmin = (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.isAdmin) next()
      else res.status(403).send('Must be an admin to access')
    } else res.status(403).send('Must login to access')
  } catch (err) {
    next(err)
  }
}

const sendEmail = (req, res, next) => {
  try {
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
    console.log('SENT')
  } catch (error) {
    next(err)
  }
}
module.exports = {
  isUser,
  isAdmin,
  sendEmail
}
