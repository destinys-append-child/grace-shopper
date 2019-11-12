import axios from 'axios'

// Action Types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// Action Creator
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

// Thunk Creator
export const getSingleProductThunk = id => async dispatch => {
  try {
    let {data} = await axios.get(`/api/products/${id}`)
    if (data) dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

// Initial State
const defaultProduct = {}

// Reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
