import React from 'react'
import {connect} from 'react-redux'

import '../css/userDetails.css'
import {update} from '../store'

class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {firstName, lastName, email} = this.props.currentUser
    this.setState({firstName: firstName, lastName: lastName, email: email})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateUser(this.state)
  }

  render() {
    return (
      <div id="user-details">
        <h4>
          Edit your details below so your YDS account is always up to date.
        </h4>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <h4 className="ui dividing header">Personal Information</h4>
          <div className="two fields">
            <div className="field">
              <label>Name</label>
              <div className="two fields">
                <div className="field">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <button className="ui button" type="submit">
            UPDATE
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentUser: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: userInfo => dispatch(update(userInfo))
  }
}

export default connect(mapState, mapDispatch)(UserDetails)
