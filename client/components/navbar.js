import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Login, Signup} from '../components'

import './navbar.css'

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
    const {handleClick, isLoggedIn, userName} = this.props

    return (
      <div id="navbar">
        <h1>YACHTS DON'T STOP</h1>
        <h4>A One Stop Shop for Yachts</h4>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <p>Let's set sail{userName}!</p>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/cart">Cart </Link>
              <Link to="/wishlist">Wishlist </Link>
              <button type="button" onClick={this.viewLoginForm}>
                Login
              </button>
              {this.state.viewLogin ? <Login /> : null}
              <button type="button" onClick={this.viewSignupForm}>
                Signup
              </button>
              {this.state.viewSignup ? <Signup /> : null}
              {/*INPUT SEARCH BAR*/}
            </div>
          )}
        </nav>
        <hr />
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
    userName: state.user.name
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
