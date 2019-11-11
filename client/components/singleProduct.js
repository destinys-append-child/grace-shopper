import React, {Component} from 'react'
import PropTypes from 'prop-types' // need this?
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/singleProduct'
import {userAddToCartThunk} from '../store/cart'
import {yachtsThunk, categoryThunk} from '../store/allProducts'
import {Button} from 'semantic-ui-react'

import './singleProduct.css'

class DisconnectedSingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.addToCart = this.addToCart.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.getSingleProduct(id)
  }
  getByCategory(str) {
    this.props.getByCategory(str)
  }
  changeHandler(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  addToCart() {
    if (!this.props.user.id) {
      let cart = window.localStorage.getItem('cart')
      if (cart) {
        cart = JSON.parse(cart)
        if (cart[this.props.singleProduct.id])
          cart[this.props.singleProduct.id] += Number(this.state.quantity)
        else {
          cart[this.props.singleProduct.id] = Number(this.state.quantity)
        }
        window.localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        let cart = {}
        cart[this.props.singleProduct.id] = 1
        window.localStorage.setItem('cart', JSON.stringify(cart))
      }
    } else {
      console.log('BUTTON HIT')
      this.props.addToUserCart(this.props.singleProduct.id, this.state.quantity)
    }
    this.setState({quantity: 1})
  }

  render() {
    const yacht = this.props.singleProduct
    let addDisabled = false
    if (this.state.quantity > this.props.singleProduct.quantity) {
      addDisabled = true
    }
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
        <div id="singleYacht">
          <div className="ui card">
            {yacht.imageUrlAltView ? (
              <div className="ui slide masked reveal image">
                <img src={yacht.imageUrl} className="visible content" />
                <img src={yacht.imageUrlAltView} className="hidden content" />
              </div>
            ) : (
              <div className="image">
                <img src={yacht.imageUrl} />
              </div>
            )}
            <div className="content">
              <a className="center aligned header">{yacht.name}</a>
              <br />
              <div className="center aligned description">
                {/* <div className="meta">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(yacht.price)}
                {yacht.description}
              </div> */}
                <p>$ {yacht.price.toLocaleString()} USD</p>
                <p>{yacht.description}</p>
              </div>
            </div>
            {yacht.quantity && yacht.quantity > 0 ? (
              <div className="extra content">
                <Button
                  className="mini ui button"
                  id="addToCart"
                  onClick={this.addToCart}
                  disabled={addDisabled}
                >
                  ADD TO CART
                </Button>
                <input
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  min="0"
                  max={yacht.quantity}
                  onChange={this.changeHandler}
                />
              </div>
            ) : (
              <div>
                <h1>Sorry Boss, SOLD OUT</h1>
              </div>
            )}
          </div>
        </div>
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
  getByCategory: categoryName => dispatch(categoryThunk(categoryName)),
  addToUserCart: (id, quantity) => dispatch(userAddToCartThunk(id, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleProduct
)
