// import axios from 'axios'
// //PURPOSE: GETTING TOTAL COST

// //ACTION TYPE
// export const TOTAL_COST = 'TOTAL_COST'
// export const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES'

// //ACTION CREATOR
// export const getTotalCost = cost => ({
//   type: TOTAL_COST,
//   cost

// })

// export const addAddresses = (addresses) => ({
//   type: UPDATE_ADDRESSES,
//   addresses
// })

// //THUNK CREATOR
// export const getTotalCostThunk = () => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get('api/checkout')
//       dispatch(getTotalCost(data))
//     } catch (error) {
//       console.log('Error in totalCostThunk', error)
//     }
//   }
// }

// export const updateAddressThunk = (addresses) => {
//   return async dispatch => {
//     console.log("alkdjal;kfjadl;fkj")
//     const { data } = await axios.put('/api/checkout/confirmation', addresses)
//     dispatch(addAddresses(data));
//   }
// }

// //REDUCER

// export default function checkoutReducer(cost = {}, action) {
//   switch (action.type) {
//     case TOTAL_COST:
//       return action.cost
//     case UPDATE_ADDRESSES:
//       return action.cost
//     default:
//       return cost
//   }
// }
