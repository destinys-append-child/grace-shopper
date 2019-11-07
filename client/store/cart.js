import axios from 'axios'

// Action Types
const GOT_CART = 'GOT_CART'
const INCREASED_QTY = 'INCREASED_QTY'
const DECREASED_QTY = 'DECREASED_QTY'
const REMOVED_ITEM = 'REMOVED_ITEM'

// Action Creators
const gotCart = cart => ({type: GOT_CART, cart})
const increasedQty = cart => ({type: INCREASED_QTY, cart})
const decreasedQty = cart => ({type: DECREASED_QTY, cart})
const removedItem = cart => ({type: REMOVED_ITEM, cart})

// Thunk Creators
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/not-purchased')
    dispatch(gotCart(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const increaseQty = productId => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/not-purchased/increase', {
      productId
    })
    dispatch(increasedQty(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

export const decreaseQty = productId => async dispatch => {
  try {
    const {data} = await axios.put('/api/orders/not-purchased/decrease', {
      productId
    })
    dispatch(decreasedQty(data))
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

// Reducer
export default function cartReducer(cart = {}, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case increasedQty:
      return action.cart
    case decreasedQty:
      return action.cart
    case removedItem:
      return action.cart
    default:
      return cart
  }
}
