import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getCart, getGuestCart} from '../store/cart'
import CartItem from './cartItem'
import '../css/cart.css'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

class Cart extends Component {
  componentDidMount() {
    this.props.isLoggedIn && this.props.fetchCart()
    !this.props.isLoggedIn && this.props.fetchGuestCart()
  }
  render() {
    return (
      <div>
        <div className="cart-view">
          <h2>MY CART</h2>
          {this.props.cart &&
          this.props.cart.products &&
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
        <div className="checkout-button">
          <Link to="/products">
            <Button className="ui button">KEEP SHOPING</Button>
          </Link>
          <Link to="/checkout">
            <Button className="ui button">CHECKOUT</Button>
          </Link>
        </div>
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
    fetchCart: () => dispatch(getCart()),
    fetchGuestCart: () => dispatch(getGuestCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
