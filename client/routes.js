import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  YachtsList,
  SingleProduct,
  Cart,
  Checkout,
  Confirmation,
  Orders
} from './components'
import {me} from './store'
import Home from './components/home'
import UserProfile from './components/user-profile'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/products" component={YachtsList} />
        <Route
          exact
          path="/checkout"
          component={() => <Checkout isLoggedIn={this.props.isLoggedIn} />}
        />
        <Route exact path="/checkout/confirmation" component={Confirmation} />
        <Route
          path="/cart"
          component={() => <Cart isLoggedIn={this.props.isLoggedIn} />}
        />
        <Route
          path="/profile/:page"
          component={props => (
            <UserProfile {...props} isLoggedIn={this.props.isLoggedIn} />
          )}
        />
        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
