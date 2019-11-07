import React from 'react'
import {connect} from 'react-redux'

import {increaseQty, decreaseQty, removeItem} from '../store/cart'

function CartItem(props) {
  const {cartItem, clickHandler} = props
  return (
    <div key={cartItem.id} className="cart-item">
      <a href={`/products/${cartItem.id}`}>
        <h3 className="product-name">{cartItem.name}</h3>
        <img className="product-image" src={cartItem.imageUrl} />
      </a>
      <div id={cartItem.id}>
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
