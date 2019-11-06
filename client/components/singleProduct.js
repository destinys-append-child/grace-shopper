import React, {Component} from 'react'
import PropTypes from 'prop-types' // need this?
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/singleProduct'

class DisconnectedSingleProduct extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    console.log(id)
    this.props.getSingleProduct(id)
  }

  render() {
    //const yacht = this.props.singleProduct
    return (
      <div className="singleProduct">
        <img src={this.props.singleProduct.imageUrl} />
        <h2>{this.props.singleProduct.name}</h2>
        <h3>{this.props.singleProduct.price}</h3>
        <br />
        <p>{this.singleProduct.description}</p>
        this.props.singleProduct.quantity > 0 ?
        <button id="addToCart" onClick={this.addToCart}>
          Add To Cart
        </button>
        <input
          type="number"
          name="quantity"
          max={this.props.singleProduct.quantity}
        />{' '}
        : <h1>Sorry Boss, SOLD OUT</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.defaultProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleProduct
)
