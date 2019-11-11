import axios from 'axios'
//PURPOSE: GETTING TOTAL COST

//ACTION TYPE
export const TOTAL_COST = 'TOTAL_COST'

//ACTION CREATOR
export const getTotalCost = cost => ({
  type: TOTAL_COST,
  cost
})

//THUNK CREATOR
export const getTotalCostThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('api/checkout')
      dispatch(getTotalCost(data))
    } catch (error) {
      console.log('Error in totalCostThunk', error)
    }
  }
}

//REDUCER

export default function checkoutReducer(cost = {}, action) {
  switch (action.type) {
    case TOTAL_COST:
      return action.cost
    default:
      return cost
  }
}
