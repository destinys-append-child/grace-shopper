import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import '../css/auth-form.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="form" className="ui form error">
      <form onSubmit={handleSubmit} name={name} className="ui mini form">
        <div>
          <label htmlFor="email" />
          <input name="email" type="email" placeholder="email" required />
        </div>
        <div>
          <label htmlFor="password" />
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </div>
        {name === 'signup' && (
          <div>
            <div>
              <label htmlFor="firstName" />
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
        )}
        <div>
          <button type="submit" className="mini ui button">
            {displayName}
          </button>
        </div>
        <br />
        {error &&
          error.response && (
            <div className="ui error message"> {error.response.data} </div>
          )}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      let inputs = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      if (evt.target.firstName) inputs.firstName = evt.target.firstName.value
      if (evt.target.lastName) inputs.lastName = evt.target.lastName.value
      const formName = evt.target.name
      dispatch(auth(inputs, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
