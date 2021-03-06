/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './singleProduct'
export {default as YachtsList} from './allProducts'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as Confirmation} from './confirmation'
export {default as Orders} from './orders'
