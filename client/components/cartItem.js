import React from 'react'

function CartItem(props) {
  const {cartItem} = props
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
}

export default CartItem
