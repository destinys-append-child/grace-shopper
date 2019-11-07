import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import YachtsList from './allProducts'
import {logout} from '../store'
import {Login, Signup} from '../components'

import './navbar.css'
import {Button} from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewLogin: false,
      viewSignup: false
    }
    this.viewLoginForm = this.viewLoginForm.bind(this)
    this.viewSignupForm = this.viewSignupForm.bind(this)
  }

  viewLoginForm() {
    this.setState(prevState => ({
      ...prevState,
      viewLogin: !prevState.viewLogin
    }))
  }

  viewSignupForm() {
    this.setState(prevState => ({
      ...prevState,
      viewSignup: !prevState.viewSignup
    }))
  }

  render() {
    const {handleClick, isLoggedIn} = this.props

    return (
      <div id="navbar">
        <h1>YACHTS DON'T STOP</h1>
        <h4>A One Stop Shop for Yachts</h4>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/cart">Cart </Link>
              <Link to="/wishlist">Wishlist </Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/cart">Cart </Link>
              <Link to="/wishlist">Wishlist </Link>
              <Button
                type="button"
                onClick={this.viewLoginForm}
                class="ui button active"
              >
                Login
              </Button>
              {this.state.viewLogin ? <Login /> : null}
              <button type="button" onClick={this.viewSignupForm}>
                Signup
              </button>
              {this.state.viewSignup ? <Signup /> : null}
              {/*INPUT SEARCH BAR*/}
            </div>
          )}
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * NOTES:
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

/*change view for after login: 'Let's Set Sail {user.name}!'*/
