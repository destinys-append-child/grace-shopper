import React, {Component} from 'react'
import {connect} from 'react-redux'

import {me} from '../store/user'
import {getCart, getGuestCart} from '../store/cart'
import CartItem from './cartItem'
import './cart.css'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount() {
    this.props.isLoggedIn && this.props.fetchCart()
    !this.props.isLoggedIn && this.props.fetchGuestCart()
  }
  render() {
    return (
      <div className="cart">
        <h2>Items in Cart</h2>
        {this.props.cart &&
        this.props.cart.id &&
        this.props.cart.products.length ? (
          <div>
            {this.props.cart.products.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
        ) : (
          <h3>No items in cart.</h3>
        )}
        <Link to="/checkout">
          <button type="button">CHECKOUT</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(me()),
    fetchCart: () => dispatch(getCart()),
    fetchGuestCart: () => dispatch(getGuestCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
