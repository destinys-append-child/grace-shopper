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
        <h1>CONFIRMATION</h1>
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
