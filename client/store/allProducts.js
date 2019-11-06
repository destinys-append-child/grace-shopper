import axios from 'axios'
//ACTION TYPES
export const GET_YACHTS = 'GET_YACHTS'
export const GET_SINGLE_YACHT = 'GET_SINGLE_YACHT'

//ACTION CREATORS
export const getYachts = yachts => ({
  type: GET_YACHTS,
  yachts
})

export const getSingleYacht = singleYacht => ({
  type: GET_SINGLE_YACHT,
  singleYacht
})

//THUNK CREATOR
export const yachtsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/allyachts')
      dispatch(getYachts(data))
    } catch (error) {
      console.log('THERE IS A PROBLEM WITH YACHTSTHUNK', error)
    }
  }
}

export const singleYachtThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/allyachts/${id}`)
      dispatch(getSingleYacht(data))
    } catch (error) {
      console.log('PROBLEM WITH SINGLEYACHT THUNK', error)
    }
  }
}

//REDUCERS
export const allYachtsReducer = (yachts = [], action) => {
  switch (action.type) {
    case GET_YACHTS:
      return action.yachts
    default:
      return yachts
  }
}
export const singleYachtReducer = (yacht = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_YACHT:
      return action.yacht
    default:
      return yacht
  }
}

export default {allYachtsReducer, singleYachtReducer}
