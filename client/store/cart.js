import axios from 'axios'

// Action Types
const GOT_CART = 'GOT_CART'

// Action Creators
const gotCart = cart => ({type: GOT_CART, cart})

// Thunk Creators
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/not-purchased')
    dispatch(gotCart(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

// Reducer
export default function cartReducer(cart = {}, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return cart
  }
}
