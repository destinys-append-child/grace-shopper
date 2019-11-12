import React from 'react'

import OrderItem from './orderItem'

function SingleOrder(props) {
  const {id, orderCost, shipping, billing, products} = props.order
  return (
    <div className="ui card single-order">
      <h3>Order #: {id}</h3>
      <p>
        <strong>Order Cost:</strong>{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(orderCost)}
      </p>
      <p>
        <strong>Shipping:</strong> {shipping}
      </p>
      <p>
        <strong>Billing:</strong> {billing}
      </p>
      <h3>Order Items:</h3>
      {products.map(product => {
        return <OrderItem key={product.id} product={product} />
      })}
    </div>
  )
}

export default SingleOrder
