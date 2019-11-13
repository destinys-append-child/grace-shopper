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
const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES'
const CONFIRMATION = 'CONFIRMATION'

// Action Creators
const gotCart = cart => ({type: GOT_CART, cart})
export const gotGuestCart = (orderCost, products) => ({
  type: GOT_GUEST_CART,
  orderCost,
  products
})
const updatedCart = cart => ({type: UPDATED_CART, cart})
export const updatedGuestCart = (productId, quantity) => ({
  type: UPDATED_GUEST_CART,
  productId,
  quantity
})
const addToCart = cart => ({
  type: ADD_ITEM_USER,
  cart
})
const removedItem = cart => ({type: REMOVED_ITEM, cart})
const removedGuestItem = productId => ({type: REMOVED_GUEST_ITEM, productId})
export const logoutClearCart = () => ({type: LOGOUT_CLEAR_CART})
const confirmation = confirmation => ({type: CONFIRMATION, confirmation})
export const updateAddresses = addresses => ({
  type: UPDATE_ADDRESSES,
  addresses
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
    let orderCost = 0
    let products = []
    for (let key in localCart) {
      if (localCart.hasOwnProperty(key)) {
        let {data} = await axios.get(`/api/products/${key}`)
        data.orderProduct = {
          itemQty: localCart[key],
          itemPrice: data.price
        }
        orderCost += localCart[key] * data.price
        products.push(data)
      }
    }
    dispatch(gotGuestCart(orderCost, products))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const updateCart = (productId, quantity) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${productId}`, {quantity})
    dispatch(updatedCart(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

const updateGuestCartHelper = (productId, quantity, cart) => {
  try {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    let cost = cart.orderCost
    const updated = cart.products.map(product => {
      if (product.id === productId) {
        if (product.quantity >= quantity && quantity >= 1) {
          localCart[productId] = quantity
          window.localStorage.setItem('cart', JSON.stringify(localCart))
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

export const userAddToCartThunk = (id, quantity) => async dispatch => {
  try {
    let {data} = await axios.post(`/api/cart/${id}`, {
      quantity
    })
    if (data) dispatch(addToCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeItem = productId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${productId}`)
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

export const updateAddressThunk = addresses => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/checkout/confirmation', addresses)
      console.log('DATA', data)
      if (data) dispatch(updateAddresses(data))
      else alert('MUST HAVE AN ACCOUNT TO CHECKOUT')
    } catch (error) {
      console.error(error)
    }
  }
}
export const confirmationThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/checkout/confirmation')
      if (data) dispatch(confirmation(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// Initial State
const initialState = {
  id: 'guest',
  orderCost: 0,
  shipping: null,
  billing: null,
  isPurchased: false,
  userId: null,
  products: []
}

// Reducer
export default function(cart = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case GOT_GUEST_CART:
      return {...cart, orderCost: action.orderCost, products: action.products}
    case UPDATED_CART:
      return action.cart
    case UPDATED_GUEST_CART:
      return updateGuestCartHelper(action.productId, action.quantity, cart)
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
      return initialState
    case ADD_ITEM_USER:
      return action.cart
    case UPDATE_ADDRESSES:
      return action.addresses
    case CONFIRMATION:
      return initialState
    default:
      return cart
  }
}
