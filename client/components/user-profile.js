import React from 'react'
import './user-profile.css'

class UserProfile extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="user-profile">
        <h1>MY ACCOUNT</h1>
        <div className="ui secondary pointing menu">
          <a className="item">
            <i className="address card icon" /> My Details
          </a>
          <a className="active item">
            <i className="lock icon" /> Change Password
          </a>
          <a to="/orders" className="active item">
            <i className="box icon" /> My Orders
          </a>
        </div>
      </div>
    )
  }
}

export default UserProfile
