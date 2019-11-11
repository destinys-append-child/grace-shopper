import React, {Component} from 'react'
import {connect} from 'react-redux'

import {me} from '../store/user'
import {getCart, getGuestCart} from '../store/cart'
import './checkout.css'
import {Link} from 'react-router-dom'

class Checkout extends Component {
  componentDidMount() {
    this.props.isLoggedIn && this.props.fetchCart()
    !this.props.isLoggedIn && this.props.fetchGuestCart()
  }
  render() {
    return (
      <div>
        {this.props.cart &&
        this.props.cart.id &&
        this.props.cart.products.length ? (
          <div className="checkout">
            <h1 className="title">THIS IS CHECKOUT!!!!!!!!!!!!!!</h1>
            <h1 className="title">Order summary</h1>
            <table id="ordersTable">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              {this.props.cart.products.map(cartItem => (
                <tr key={cartItem.id}>
                  <td>
                    <h2>{cartItem.name}</h2>
                  </td>
                  <td>
                    <img className="product-image" src={cartItem.imageUrl} />
                  </td>
                  <td>
                    <h3 className="product-price">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(cartItem.price)}
                    </h3>
                  </td>
                  <td>
                    <h3>{cartItem.orderProduct.itemQty}</h3>
                  </td>
                </tr>
              ))}
            </table>
            <br />
            <br />
            <h1 className="title">Payment Information</h1>
            <br />
            <br />
            <h1 className="title">FORM</h1>

            <Link to="/checkout/confirmation">
              <button type="button">COMPLETE ORDER</button>
            </Link>
            <Link to="/cart">
              <button type="button">BACK TO CART</button>
            </Link>
          </div>
        ) : (
          <h3>Nothing to checkout!</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
