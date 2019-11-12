const router = require('express').Router()
const {User} = require('../db/models')
const {isUser} = require('../../utils')

const {isAdmin} = require('../../utils')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', isUser, async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.user.id)
    if (currentUser) {
      currentUser.firstName = req.body.firstName
      currentUser.lastName = req.body.lastName
      currentUser.email = req.body.email
      currentUser.save()
      res.status(201).json(currentUser)
    } else {
      res.send('User Does Not Exist')
    }
  } catch (error) {
    next(error)
  }
})
