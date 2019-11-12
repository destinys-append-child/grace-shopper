import React from 'react'
import {connect} from 'react-redux'

import './userDetails.css'

class UserDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  componentDidMount() {
    const {firstName, lastName, email} = this.props.currentUser
    // this.setState({firstName: })
  }

  render() {
    console.log(this.props.currentUser)
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
                  />
                </div>
                <div className="field">
                  <input type="text" name="lastName" placeholder="Last Name" />
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" />
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
