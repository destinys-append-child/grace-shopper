/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'

import {
  increaseQty,
  increaseGuestQty,
  decreaseQty,
  decreaseGuestQty,
  removeItem,
  removeGuestItem
} from '../store/cart'

function CartItem(props) {
  const {
    cartItem,
    increase,
    increaseGuest,
    decrease,
    decreaseGuest,
    remove,
    removeGuest,
    isLoggedIn,
    quantity
  } = props
  const clickHandler = evt => {
    const method = evt.target.name || event.target.parentNode.name
    let productId =
      evt.target.parentNode.id || evt.target.parentNode.parentNode.id
    if (method === 'increase') {
      if (isLoggedIn) {
        increase(productId)
      } else {
        increaseGuest(productId)
      }
    } else if (method === 'decrease') {
      if (isLoggedIn) {
        decrease(productId)
      } else {
        decreaseGuest(productId)
      }
    } else if (method === 'remove') {
      if (isLoggedIn) {
        remove(productId)
      } else {
        removeGuest(productId)
      }
    }
  }
  let addDisabled = false
  if (quantity >= cartItem.quantity) {
    addDisabled = true
  }
  let subDisabled = false
  if (quantity <= 1) {
    subDisabled = true
  }
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
        <h3 className="product-qty">Quantity: {quantity}</h3>
        <div className="ui icon buttons" id={cartItem.id}>
          <button
            type="button"
            name="increase"
            onClick={evt => clickHandler(evt)}
            disabled={addDisabled}
            className="ui left attached button"
          >
            <i className="plus icon" />
          </button>
          <button
            type="button"
            name="decrease"
            onClick={clickHandler}
            disabled={subDisabled}
            className="ui right attached button"
          >
            <i className="minus icon" />
          </button>
          <button
            type="button"
            name="remove"
            className="negative ui button"
            onClick={clickHandler}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increase: productId => dispatch(increaseQty(productId)),
    increaseGuest: productId => dispatch(increaseGuestQty(productId)),
    decrease: productId => dispatch(decreaseQty(productId)),
    decreaseGuest: productId => dispatch(decreaseGuestQty(productId)),
    remove: productId => dispatch(removeItem(productId)),
    removeGuest: productId => dispatch(removeGuestItem(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
