import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getOrders} from '../store/orders'
import SingleOrder from './singleOrder'
import '../css/orders.css'

class Orders extends Component {
  componentDidMount() {
    this.props.isLoggedIn && this.props.fetchOrders()
  }
  render() {
    return (
      <div className="orders">
        <h2>MY ORDERS</h2>
        {this.props.orders && this.props.orders.length ? (
          <div>
            {this.props.orders.map(order => {
              return <SingleOrder key={order.id} order={order} />
            })}
          </div>
        ) : (
          <div>
            <h3>No past orders.</h3>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
