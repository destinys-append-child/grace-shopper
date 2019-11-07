import React, {Component} from 'react'
import PropTypes from 'prop-types' // need this?
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/singleProduct'

class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSingleProduct(id)
  }

  render() {
    const yacht = this.props.singleProduct

    return yacht.name ? (
      <div className="singleProduct">
        <img src={yacht.imageUrl} />
        <h2>{yacht.name}</h2>
        <h3>${yacht.price}</h3>
        <br />
        <p>{yacht.description}</p>

        {yacht.quantity && yacht.quantity > 0 ? (
          <div>
            <button id="addToCart" onClick={this.addToCart}>
              Add To Cart
            </button>
            <input type="number" name="quantity" max={yacht.quantity} />
          </div>
        ) : (
          <div>
            <h1>Sorry Boss, SOLD OUT</h1>
          </div>
        )}
      </div>
    ) : (
      'Some Type Of 404 or Sum'
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.singleProduct
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProductThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
