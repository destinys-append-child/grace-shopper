import React, {Component} from 'react'
// import {connect} from 'react-redux'
import Cart from './cart'

export default class Checkout extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <div>
        <h1>THIS IS THE CHECKOUT</h1>
        <Cart />
      </div>
    )
  }
}
