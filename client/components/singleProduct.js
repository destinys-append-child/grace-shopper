import React, {Component} from 'react'
import PropTypes from 'prop-types' // need this?
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/singleProduct'
import {yachtsThunk, categoryThunk} from '../store/allProducts'

class DisconnectedSingleProduct extends Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSingleProduct(id)
  }
  getByCategory(str) {
    this.props.getByCategory(str)
  }

  addToCart() {
    let cart = localStorage.getItem('cart')
    console.log(cart)
    if (cart) {
      cart = JSON.parse(cart)
      if (cart[this.props.singleProduct.id]) cart[this.props.singleProduct.id]++
      else {
        cart[this.props.singleProduct.id] = 1
      }
      window.localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      let cart = {}
      cart[this.props.singleProduct.id] = 1
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
    console.log(JSON.parse(window.localStorage.getItem('cart')))
  }

  render() {
    const yacht = this.props.singleProduct

    return yacht.name ? (
      <div className="singleProduct">
        <nav id="allProductsNavBar">
          <br />
          <br />
          <Link
            className="navBarItem"
            to="/categories/Catamaran"
            onClick={() => this.props.getByCategory('Catamaran')}
          >
            Catamaran
          </Link>
          <Link
            className="navBarItem"
            to="/categories/Super%20Yacht"
            onClick={() => this.props.getByCategory('Super%20Yacht')}
          >
            Super Yacht
          </Link>
          <Link
            className="navBarItem"
            to="/categories/Motoryacht"
            onClick={() => this.props.getByCategory('Motoryacht')}
          >
            Motoryacht
          </Link>
          <Link
            className="navBarItem"
            to="/categories/Sailing%20Yacht"
            onClick={() => this.props.getByCategory('Sailing%20Yacht')}
          >
            Sailing Yacht
          </Link>
          <Link
            className="navBarItem"
            to="/categories"
            onClick={() => this.props.getYachts()}
          >
            All Yachts
          </Link>
          <br />
          <br />
        </nav>
        <br />
        <br />
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
  singleProduct: state.singleProduct,
  yachts: state.yachts,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getSingleProduct: id => dispatch(getSingleProductThunk(id)),
  getYachts: () => dispatch(yachtsThunk()),
  getByCategory: categoryName => dispatch(categoryThunk(categoryName))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleProduct
)