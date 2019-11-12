/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'

// Action Types
const GOT_CART = 'GOT_CART'
const GOT_GUEST_CART = 'GOT_GUEST_CART'
const UPDATED_CART = 'UPDATED_CART'
const UPDATED_GUEST_CART = 'UPDATED_GUEST_CART'
const ADD_ITEM_USER = 'ADD_ITEM_USER'
const REMOVED_ITEM = 'REMOVED_ITEM'
const REMOVED_GUEST_ITEM = 'REMOVED_GUEST_ITEM'
const LOGOUT_CLEAR_CART = 'LOGOUT_CLEAR_CART'

// Action Creators
const gotCart = cart => ({type: GOT_CART, cart})
const gotGuestCart = cart => ({type: GOT_GUEST_CART, cart})
const updatedCart = cart => ({type: UPDATED_CART, cart})
export const updatedGuestCart = (productId, quantity) => ({
  type: UPDATED_GUEST_CART,
  productId,
  quantity
})
const removedItem = cart => ({type: REMOVED_ITEM, cart})
const removedGuestItem = productId => ({type: REMOVED_GUEST_ITEM, productId})
export const logoutClearCart = () => ({type: LOGOUT_CLEAR_CART})
const addToCart = cart => ({
  type: ADD_ITEM_USER,
  cart
})

// Thunk Creators
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotCart(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const getGuestCart = () => async dispatch => {
  try {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    const {data} = await axios.post(
      '/api/orders/not-purchased/guest',
      localCart
    )
    dispatch(gotGuestCart(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const updateCart = (productId, quantity) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart`, {productId, quantity})
    dispatch(updatedCart(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

const updateGuestCartThunk = (productId, quantity, cart) => {
  try {
    let cost = cart.orderCost
    const updated = cart.products.map(product => {
      if (product.id === productId) {
        if (product.quantity >= quantity && quantity >= 1) {
          const productCopy = {
            ...product,
            orderProduct: {...product.orderProduct}
          }
          const orderItem = productCopy.orderProduct
          const currentItemCost = orderItem.itemQty * orderItem.itemPrice
          const updatedItemCost = quantity * orderItem.itemPrice
          cost += updatedItemCost - currentItemCost
          orderItem.itemQty = quantity
          return productCopy
        }
      }
      return product
    })
    return {...cart, orderCost: cost, products: updated}
  } catch (err) {
    console.log('Error:', err)
  }
}

export const removeItem = productId => async dispatch => {
  try {
    const {data} = await axios.delete(
      `/api/orders/not-purchased/remove/${productId}`
    )
    dispatch(removedItem(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const removeGuestItem = productId => async dispatch => {
  try {
    let localCart = JSON.parse(localStorage.getItem('cart'))
    if (localCart) {
      if (localCart[productId]) {
        delete localCart[productId]
        window.localStorage.setItem('cart', JSON.stringify(localCart))
      }
    }
    dispatch(removedGuestItem(productId))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const userAddToCartThunk = (id, quantity) => async dispatch => {
  try {
    console.log('THUNK HIT')
    let {data} = await axios.post(`/api/products/${id}`, {
      quantity
    })
    if (data) dispatch(addToCart(data))
  } catch (error) {
    console.error(error)
  }
}

// Reducer
export default function(cart = {}, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case GOT_GUEST_CART:
      return action.cart
    case UPDATED_CART:
      return action.cart
    case UPDATED_GUEST_CART:
      return updateGuestCartThunk(action.productId, action.quantity, cart)
    case REMOVED_ITEM:
      return action.cart
    case REMOVED_GUEST_ITEM:
      let total = cart.orderCost
      const filteredProds = cart.products.filter(product => {
        if (product.id === Number(action.productId)) {
          total -= product.price * product.orderProduct.itemQty
          return false
        } else {
          return true
        }
      })
      return {...cart, orderCost: total, products: filteredProds}
    case LOGOUT_CLEAR_CART:
      return {}
    case ADD_ITEM_USER:
      console.log('HITT')
      return action.cart
    default:
      return cart
  }
}
