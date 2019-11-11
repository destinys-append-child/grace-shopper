import React from 'react'
import {connect} from 'react-redux'

import {increaseQty, decreaseQty, removeItem} from '../store/cart'

import './cartItem.css'

function CartItem(props) {
  const {cartItem, clickHandler} = props
  return (
    <div key={cartItem.id} className="cart-item">
      <div className="ui card">
        <a href={`/products/${cartItem.id}`}>{cartItem.name}</a>
        <a href={`/products/${cartItem.id}`}>
          <img className="product-image" src={cartItem.imageUrl} />
        </a>
        <div id={cartItem.id}>
          <div className="product-price">
            Price:{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(cartItem.price)}
          </div>
          <div className="product-qty">
            Qty: {cartItem.orderProduct.itemQty}
          </div>
          <div className="cart adjust">
            <button type="button" name="increase" onClick={clickHandler}>
              +
            </button>
            <button type="button" name="decrease" onClick={clickHandler}>
              -
            </button>
            <button type="button" name="remove" onClick={clickHandler}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // increase: productId => dispatch(increaseQty(productId))
    clickHandler(evt) {
      const method = evt.target.name
      const productId = evt.target.parentNode.id
      if (method === 'increase') {
        dispatch(increaseQty(productId))
      } else if (method === 'decrease') {
        dispatch(decreaseQty(productId))
      } else if (method === 'remove') {
        dispatch(removeItem(productId))
      }
    }
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
