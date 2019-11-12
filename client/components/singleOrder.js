import React from 'react'

import OrderItem from './orderItem'

function SingleOrder(props) {
  const {id, orderCost, shipping, billing, products} = props.order
  return (
    <div className="single-order">
      <h3>Single Order</h3>
      <h3>Order ID: {id}</h3>
      <h3>
        Order Cost:{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(orderCost)}
      </h3>
      <h3>Shipping: {shipping}</h3>
      <h3>Billing: {billing}</h3>
      <h3>Order Items:</h3>
      {products.map(product => {
        return <OrderItem key={product.id} product={product} />
      })}
    </div>
  )
}

export default SingleOrder
