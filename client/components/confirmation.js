import React, {Component} from 'react'
import {connect} from 'react-redux'
import {confirmationThunk} from '../store/cart'
import './confirmation.css'

class Confirmation extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  componentDidMount() {
    this.props.confirmation()
  }

  render() {
    return (
      <div>
        <div className="confirmation">
          <h1>CONGRATULATIONS! ORDER CONFIRMED:</h1>
          <h2>Your yacht(s) are being *shipped to you at this very moment!</h2>
          <h2>Happy Sailing :)</h2>
          <img src="https://i.pinimg.com/474x/1a/67/15/1a671577182d2146add4ee1a97dc14c4.jpg" />
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  confirmation: () => dispatch(confirmationThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
