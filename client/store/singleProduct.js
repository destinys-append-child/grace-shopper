import axios from 'axios'
import history from '../history'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
// const REMOVE_FROM_INV = 'REMOVE_FROM_INV'

const defaultProduct = {}

const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const getSingleProductThunk = id => async dispatch => {
  try {
    let {data} = await axios.get(`/api/products/${id}`)
    if (data) dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
