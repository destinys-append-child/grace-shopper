import axios from 'axios'
//ACTION TYPES
export const GET_YACHTS = 'GET_YACHTS'
export const GET_BY_CATEGORY = 'GET_BY_CATEGORY'

//ACTION CREATORS
export const getYachts = yachts => ({
  type: GET_YACHTS,
  yachts
})

export const getCategory = category => ({
  type: GET_BY_CATEGORY,
  category
})

//THUNK CREATOR
export const yachtsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getYachts(data))
    } catch (error) {
      console.log('THERE IS A PROBLEM WITH YACHTSTHUNK', error)
    }
  }
}

export const categoryThunk = categoryName => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products?category=${categoryName}`)
      console.log('THIS IS CALLED')
      dispatch(getCategory(data))
    } catch (error) {
      console.log('PROBLEM WITH SINGLEYACHT THUNK', error)
    }
  }
}

//REDUCERS
export default function allYachtsReducer(yachts = [], action) {
  switch (action.type) {
    case GET_YACHTS:
      return action.yachts
    case GET_BY_CATEGORY:
      return action.category
    default:
      return yachts
  }
}
