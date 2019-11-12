import React from 'react'

function OrderItem(props) {
  const {name, imageUrl} = props.product
  const {itemPrice, itemQty} = props.product.orderProduct
  return (
    <div className="order-item">
      <img className="product-image" src={imageUrl} />
      <div className="order-item-info">
        <h4>Name: {name}</h4>
        <h4>
          Price:{' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(itemPrice)}
        </h4>
        <h4>Quantity: {itemQty}</h4>
      </div>
    </div>
  )
}

export default OrderItem
