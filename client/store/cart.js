/* eslint-disable complexity */
/* eslint-disable no-case-declarations */
import axios from 'axios'

// Action Types
const GOT_CART = 'GOT_CART'
const GOT_GUEST_CART = 'GOT_GUEST_CART'
const INCREASED_QTY = 'INCREASED_QTY'
const INCREASED_GUEST_QTY = 'INCREASED_GUEST_QTY'
const DECREASED_QTY = 'DECREASED_QTY'
const DECREASED_GUEST_QTY = 'DECREASED_GUEST_QTY'
const REMOVED_ITEM = 'REMOVED_ITEM'
const REMOVED_GUEST_ITEM = 'REMOVED_GUEST_ITEM'
const LOGOUT_CLEAR_CART = 'LOGOUT_CLEAR_CART'

// Action Creators
const gotCart = cart => ({type: GOT_CART, cart})
const gotGuestCart = cart => ({type: GOT_GUEST_CART, cart})
const increasedQty = cart => ({type: INCREASED_QTY, cart})
const increasedGuestQty = productId => ({type: INCREASED_GUEST_QTY, productId})
const decreasedQty = cart => ({type: DECREASED_QTY, cart})
const decreasedGuestQty = productId => ({type: DECREASED_GUEST_QTY, productId})
const removedItem = cart => ({type: REMOVED_ITEM, cart})
const removedGuestItem = productId => ({type: REMOVED_GUEST_ITEM, productId})
export const logoutClearCart = () => ({type: LOGOUT_CLEAR_CART})

// Thunk Creators
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/not-purchased')
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

export const increaseQty = productId => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/orders/not-purchased/increase/${productId}`
    )
    dispatch(increasedQty(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const increaseGuestQty = productId => async dispatch => {
  try {
    let localCart = JSON.parse(localStorage.getItem('cart'))
    if (localCart) {
      localCart[productId] ? localCart[productId]++ : (localCart[productId] = 1)
      window.localStorage.setItem('cart', JSON.stringify(localCart))
    }
    dispatch(increasedGuestQty(productId))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const decreaseQty = productId => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/orders/not-purchased/decrease/${productId}`
    )
    dispatch(decreasedQty(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const decreaseGuestQty = productId => async dispatch => {
  try {
    let localCart = JSON.parse(localStorage.getItem('cart'))
    if (localCart) {
      if (localCart[productId] && localCart[productId] > 1) {
        localCart[productId]--
        window.localStorage.setItem('cart', JSON.stringify(localCart))
      }
    }
    dispatch(decreasedGuestQty(productId))
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

// Reducer
export default function(cart = {}, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case GOT_GUEST_CART:
      return action.cart
    case INCREASED_QTY:
      return action.cart
    case DECREASED_QTY:
      return action.cart
    case REMOVED_ITEM:
      return action.cart
    case INCREASED_GUEST_QTY:
      const newProducts = cart.products.map(product => {
        if (product.id === Number(action.productId)) {
          product.orderProduct.itemQty++
        }
        return product
      })
      return {...cart, products: newProducts}
    case DECREASED_GUEST_QTY:
      const newProds = cart.products.map(product => {
        if (product.id === Number(action.productId)) {
          product.orderProduct.itemQty--
        }
        return product
      })
      return {...cart, products: newProds}
    case REMOVED_GUEST_ITEM:
      const filteredProds = cart.products.filter(product => {
        return product.id !== Number(action.productId)
      })
      return {...cart, products: filteredProds}
    case LOGOUT_CLEAR_CART:
      return {}
    default:
      return cart
  }
}
