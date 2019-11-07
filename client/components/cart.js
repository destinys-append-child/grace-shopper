import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getCart} from '../store/cart'

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
            {this.props.cart.products.map(cartItem => {
              console.log('cartItem:', cartItem)
              return (
                <div key={cartItem.id} className="cart-item">
                  <a href={`/products/${cartItem.id}`}>
                    <h3 className="product-name">{cartItem.name}</h3>
                    <img className="product-image" src={cartItem.imageUrl} />
                  </a>
                  <div>
                    <h3 className="product-price">
                      Price:{' '}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(cartItem.price)}
                    </h3>
                    <h3 className="product-qty">
                      Quantity: {cartItem.orderProduct.itemQty}
                    </h3>
                  </div>
                </div>
              )
            })}
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
    fetchCart: () => dispatch(getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
