import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProduct from './singleProduct'
import cart from './cart'

// const reducer = combineReducers({user, singleProduct})
import allYachtsReducer from './allProducts'

const rootReducer = combineReducers({
  user: user,
  yachts: allYachtsReducer,
  singleProduct: singleProduct,
  cart: cart
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'
export * from './singleProduct'
// export * from './allProducts'
