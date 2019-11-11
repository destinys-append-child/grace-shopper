import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProduct from './singleProduct'
import cart from './cart'
import orders from './orders'
import checkoutReducer from './checkout'
import allYachtsReducer from './allProducts'

const rootReducer = combineReducers({
  user: user,
  yachts: allYachtsReducer,
  singleProduct: singleProduct,
  cart: cart,
  cost: checkoutReducer,
  orders: orders
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
export * from './singleProduct'
export * from './cart'
export * from './orders'
export * from './checkout'
export * from './allProducts'
