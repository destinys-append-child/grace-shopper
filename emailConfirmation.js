const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'gmail.com',
  auth: {
    user: process.env.NODEMAIL_EMAIL,
    pass: process.env.NODEMAIL_PASS
  }
})
const sendEmail = () => {}
