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
  Orders
} from './components'
import {me} from './store'
import Home from './components/home'
import UserProfile from './components/user-profile'
import UserDetails from './components/userDetails'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* Displays our Login component as a fallback */}

        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/categories/:categoryName" component={YachtsList} />
        <Route path="/categories" component={YachtsList} />
        <Route path="/checkout" component={Checkout} />
        <Route
          path="/cart"
          component={() => <Cart isLoggedIn={this.props.isLoggedIn} />}
        />
        <Route
          path="/orders"
          component={() => <Orders isLoggedIn={this.props.isLoggedIn} />}
        />
        <Route exact path="/userDetails" component={UserDetails} />
        <Route path="/profile" component={UserProfile} />
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
