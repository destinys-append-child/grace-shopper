import React from 'react'

import OrderItem from './orderItem'

function SingleOrder(props) {
  const {id, orderCost, shipping, billing, products} = props.order
  return (
    <div className="ui card single-order">
      <h3>Order #: {id}</h3>
      <h4>
        Order Cost:{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(orderCost)}
      </h4>
      <h4>Shipping: {shipping}</h4>
      <h4>Billing: {billing}</h4>
      <h4>Order Items:</h4>
      {products.map(product => {
        return <OrderItem key={product.id} product={product} />
      })}
    </div>
  )
}

export default SingleOrder
