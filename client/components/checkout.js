import React, {Component} from 'react'
import {connect} from 'react-redux'
import Cart from './cart'
import {getTotalCostThunk} from '../store/checkout'

class Checkout extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  componentDidMount() {
    this.props.getTotalCost()
  }

  render() {
    const {cost} = this.props
    return (
      <div>
        <h1>THIS IS THE CHECKOUT</h1>
        <Cart />
        <h1>TOTAL COST:{cost.orderCost} </h1>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cost: state.cost
})

const mapDispatchToProps = dispatch => ({
  getTotalCost: () => dispatch(getTotalCostThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
