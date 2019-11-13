const router = require('express').Router()
const {Order, Product} = require('../db/models')
const {isUser} = require('../../utils')
module.exports = router

// GET /api/cart
// Pull from orders table where isPurchased is false
router.get('/', isUser, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product}]
    })
    if (cart) res.send(cart)
    else res.send(`No items in cart`)
  } catch (err) {
    next(err)
  }
})

// POST /api/cart/:productId
// Add product to cart
router.post('/:productId', isUser, async (req, res, next) => {
  try {
    const thisProduct = await Product.findByPk(req.params.productId)
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
        return e.id == req.params.productId
      })
      if (product) {
        console.log('PRODUCT EXISTS')
        const orderItem = product.orderProduct
        orderItem.itemQty += Number(req.body.quantity)

        if (orderItem.itemQty > product.quantity) {
          res.status(403).send(`Max quantity is ${product.quantity}`)
        } else {
          order.orderCost += product.price * Number(req.body.quantity)
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
        order.orderCost += thisProduct.price * Number(req.body.quantity)
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
          itemQty: Number(req.body.quantity),
          itemPrice: thisProduct.price
        }
      })
      res.send(order)
    }
  } catch (error) {
    next(error)
  }
})

// PUT /api/cart/:productId
// Update the quantity of items in cart
router.put('/:productId', isUser, async (req, res, next) => {
  try {
    const {quantity} = req.body
    let {productId} = req.params
    productId = Number(productId)
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product, where: {id: productId}}]
    })
    if (order) {
      const product = order.products[0]
      const orderItem = product.orderProduct
      if (product.quantity >= quantity && quantity >= 1) {
        const currentItemCost = orderItem.itemQty * orderItem.itemPrice
        const updatedItemCost = quantity * orderItem.itemPrice
        const newTotal = order.orderCost + (updatedItemCost - currentItemCost)
        await order.update({orderCost: newTotal})
        await orderItem.update({itemQty: quantity})
      }
      const updatedOrder = await Order.findByPk(order.id, {
        include: [{model: Product}]
      })
      res.send(updatedOrder)
    } else {
      res.status(404).send(`Cannot find order`)
    }
  } catch (err) {
    next(err)
  }
})

// DELETE /api/cart/:productId
// Delete item in cart
router.delete('/:productId', isUser, async (req, res, next) => {
  try {
    let {productId} = req.params
    productId = Number(productId)
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      include: [{model: Product}]
    })
    if (order) {
      const product = order.products.find(item => item.id === productId)
      if (product) {
        const orderItem = product.orderProduct
        const quantity = orderItem.itemQty
        await orderItem.destroy()
        const newTotal = order.orderCost - product.price * quantity
        await order.update({orderCost: newTotal})
        const updatedOrder = await Order.findByPk(order.id, {
          include: [{model: Product}]
        })
        res.send(updatedOrder)
      } else {
        res.status(404).send(`Cannot find productId ${productId} in order`)
      }
    } else {
      res.status(404).send(`Unable to remove from cart productId: ${productId}`)
    }
  } catch (err) {
    next(err)
  }
})
