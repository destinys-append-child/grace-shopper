/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'

import {
  removeItem,
  removeGuestItem,
  updateCart,
  updatedGuestCart
} from '../store/cart'

function CartItem(props) {
  const {
    cartItem,
    remove,
    removeGuest,
    isLoggedIn,
    quantity,
    update,
    updateGuest
  } = props
  const clickHandler = evt => {
    const method = evt.target.name || event.target.parentNode.name
    let productId =
      evt.target.parentNode.id || evt.target.parentNode.parentNode.id
    productId = Number(productId)
    if (method === 'increase') {
      const newQuantity = quantity + 1
      if (isLoggedIn) {
        update(productId, newQuantity)
      } else {
        updateGuest(productId, newQuantity)
      }
    } else if (method === 'decrease') {
      const newQuantity = quantity - 1
      if (isLoggedIn) {
        update(productId, newQuantity)
      } else {
        updateGuest(productId, newQuantity)
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
      <div className="ui card">
        <a href={`/products/${cartItem.id}`}>
          <img className="product-image" src={cartItem.imageUrl} />
        </a>
        <div>
          <a href={`/products/${cartItem.id}`}>
            <h3>{cartItem.name}</h3>
          </a>
          <p className="product-price">
            <strong>Price:</strong>{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(cartItem.price)}
          </p>
          <p className="product-qty">
            <strong>Qty:</strong> {quantity}
          </p>
          <div className="mini ui icon buttons" id={cartItem.id}>
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
    remove: productId => dispatch(removeItem(productId)),
    removeGuest: productId => dispatch(removeGuestItem(productId)),
    update: (productId, quantity) => dispatch(updateCart(productId, quantity)),
    updateGuest: (productId, quantity) =>
      dispatch(updatedGuestCart(productId, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
