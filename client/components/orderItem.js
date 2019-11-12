import React from 'react'

function OrderItem(props) {
  const {id, name, imageUrl} = props.product
  const {itemPrice, itemQty} = props.product.orderProduct
  return (
    <div className="order-item">
      <a href={`/products/${id}`}>
        <img className="product-image" src={imageUrl} />
      </a>
      <div className="order-item-info">
        <a href={`/products/${id}`}>
          <h4>{name}</h4>
        </a>
        <p>
          <strong>Price:</strong>{' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(itemPrice)}
        </p>
        <p>
          <strong>Qty:</strong> {itemQty}
        </p>
      </div>
    </div>
  )
}

export default OrderItem
