import React from 'react'
import {connect} from 'react-redux'

import './userDetails.css'

class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {firstName, lastName, email} = this.props.currentUser
    this.setState({firstName: firstName, lastName: lastName, email: email})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
    console.log('local state', this.state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <div id="user details">
        <h4>
          Edit your details below so your YDS account is always up to date.
        </h4>
        <form className="ui form">
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
          <div className="ui submit button">UPDATE</div>
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

export default connect(mapState)(UserDetails)
