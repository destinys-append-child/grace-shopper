import React, {Component} from 'react'
import {connect} from 'react-redux'

import {me} from '../store/user'
import {getCart, getGuestCart} from '../store/cart'
import CartItem from './cartItem'
import './cart.css'

class Cart extends Component {
  componentDidMount() {
    this.props.isLoggedIn && this.props.fetchCart()
    !this.props.isLoggedIn && this.props.fetchGuestCart()
  }
  render() {
    return (
      <div className="cart">
        <h2>MY CART</h2>
        {this.props.cart &&
        this.props.cart.id &&
        this.props.cart.products.length ? (
          <div>
            {this.props.cart.products.map(cartItem => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                quantity={cartItem.orderProduct.itemQty}
              />
            ))}
            <h3 className="order-cost">
              Total:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(this.props.cart.orderCost)}
            </h3>
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
