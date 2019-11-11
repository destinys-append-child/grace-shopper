const router = require('express').Router()
const {Product, Order, OrderProduct} = require('../db/models')
const utils = require('./utils')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      res.send(product)
    } else {
      res.status(404).send("OOF,couldn't find that")
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const thisProduct = await Product.findByPk(req.params.id)
    let order = await Order.findOne({
      where: {
        isPurchased: false,
        userId: req.user.id
      },
      include: [{model: Product}]
    })
    if (order) {
      console.log('ORDER EXISTS')
      const product = order.products.find(e => {
        return e.id == req.params.id
      })
      if (product) {
        console.log('PRODUCT EXISTS')
        const orderItem = product.orderProduct
        orderItem.itemQty += Number(req.body.quantity)
        if (orderItem.itemQty > product.quantity) {
          res.status(403).send(`Max quantity is ${product.quantity}`)
        } else {
          order.orderCost = product.price * orderItem.itemQty
          await orderItem.save()
          await order.save()
          res.send(order)
        }
      } else {
        console.log('PRODUCT IS ADDED')
        await order.addProduct(thisProduct.id, {
          through: {
            itemQty: Number(req.body.quantity),
            itemPrice: thisProduct.price
          }
        })
        order.orderCost += thisProduct.price * req.body.quantity
        await order.save()
        res.send(order)
      }
    } else {
      console.log('ORDER AND PRODUCT CREATED')
      order = await Order.create(
        {
          orderCost: thisProduct.price * req.body.quantity,
          userId: req.user.id
        },
        {
          include: [{model: Product}]
        }
      )
      await order.addProduct(thisProduct.id, {
        through: {
          itemQty: req.body.quantity,
          itemPrice: thisProduct.price
        }
      })
      res.send(order)
    }
  } catch (error) {
    next(error)
  }
})

router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})
