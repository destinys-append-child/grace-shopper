import React, {Component} from 'react'
import {connect} from 'react-redux'

import {me} from '../store/user'
import {getCart, getGuestCart, updateAddressThunk} from '../store/cart'
import './checkout.css'
import {Link} from 'react-router-dom'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      billing: '',
      shipping: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.isLoggedIn && this.props.fetchCart()
    !this.props.isLoggedIn && this.props.fetchGuestCart()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
    // const addresses = this.state;
    // this.props.updateAddress(addresses)
  }

  handleSubmit(event) {
    event.preventDefault()
    const addresses = this.state
    this.props.updateAddress(addresses)
    this.setState({
      billing: '',
      shipping: ''
    })
  }
  render() {
    return (
      <div>
        {this.props.cart &&
        this.props.cart.id &&
        this.props.cart.products.length ? (
          <div className="checkout">
            <h1 className="title">THIS IS CHECKOUT!!!!!!!!!!!!!!</h1>
            <h1 className="title">Order summary</h1>
            <table id="ordersTable">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
              {this.props.cart.products.map(cartItem => (
                <tr key={cartItem.id}>
                  <td>
                    <h2>{cartItem.name}</h2>
                  </td>
                  <td>
                    <img className="product-image" src={cartItem.imageUrl} />
                  </td>
                  <td>
                    <h3 className="product-price">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(cartItem.price)}
                    </h3>
                  </td>
                  <td>
                    <h3>{cartItem.orderProduct.itemQty}</h3>
                  </td>
                </tr>
              ))}
            </table>
            <br />
            <br />
            <h3 className="order-cost">
              Total:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(this.props.cart.orderCost)}
            </h3>
            <h1 className="title">FORM</h1>
            <form onSubmit={this.handleSubmit()}>
              <label>
                Billing Address:
                <input
                  type="text"
                  name="billing"
                  value={this.state.billing}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Shipping Address:
                <input
                  type="text"
                  name="shipping"
                  value={this.state.shipping}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <br />
              <Link to="/checkout/confirmation">
                <button type="submit" value="Submit">
                  COMPLETE ORDER
                </button>
              </Link>
            </form>
            <br />
            <br />
            <Link to="/cart">
              <button type="button">BACK TO CART</button>
            </Link>
          </div>
        ) : (
          <div>
            <h3>Nothing to checkout!</h3>
            <Link to="/cart">
              <button type="button">BACK TO CART</button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(me()),
    fetchCart: () => dispatch(getCart()),
    fetchGuestCart: () => dispatch(getGuestCart()),
    updateAddress: addresses => dispatch(updateAddressThunk(addresses))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
