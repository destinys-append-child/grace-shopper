const router = require('express').Router()
const {Product, Order, OrderProduct} = require('../db/models')
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
      const product = order.products.find(e => {
        console.log(e.id)
        return e.id == req.params.id
      })
      if (product) {
        console.log(product)
        const orderItem = product.orderProduct
        orderItem.itemQty += req.body.quantity
        order.orderCost = product.price * orderItem.orderItem
        orderItem.save()
        order.save()
        res.send(order)
      } else {
        order.addProduct(thisProduct.id, {
          through: {
            itemQty: req.body.quantity,
            itemPrice: thisProduct.price
          }
        })
        res.send(order)
      }
    } else {
      order = await Order.create({
        orderCost: thisProduct.price * req.body.quantity,
        userId: req.user.id
      })
      order.addProduct(thisProduct.id, {
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
