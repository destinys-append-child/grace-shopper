import axios from 'axios'

// Action Types
const GOT_ORDERS = 'GOT_ORDERS'

// Action Creators
const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

// Thunk Creators
export const getOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/purchased')
    dispatch(gotOrders(data))
  } catch (err) {
    console.log('Error:', err)
  }
}

// Reducer
export default function(orders = [], action) {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return orders
  }
}
