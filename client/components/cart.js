import React, {Component} from 'react'
import {connect} from 'react-redux'

import {me} from '../store/user'
import {getCart} from '../store/cart'
import CartItem from './cartItem'
import './cart.css'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div className="cart">
        <h2>Items in Cart</h2>
        {this.props.cart && this.props.cart.id ? (
          <div>
            {this.props.cart.products.map(cartItem => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
        ) : (
          <h3>No items in cart.</h3>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(me()),
    fetchCart: () => dispatch(getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
