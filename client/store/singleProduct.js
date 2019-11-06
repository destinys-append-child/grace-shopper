import axios from 'axios'
import history from '../history'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
// const ADD_ITEM = 'ADD_ITEM'
// const REMOVE_FROM_INV = 'REMOVE_FROM_INV'

const defaultProduct = {}

const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const getSingleProductThunk = id => async dispatch => {
  try {
    let {data} = await axios.get(`api/products/${id}`)
    console.log(data)
    if (data) dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      console.log('HIT')
      return action.product
    default:
      return state
  }
}
