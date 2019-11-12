import React, {Component} from 'react'
import {connect} from 'react-redux'
import {confirmationThunk} from '../store/cart'

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
