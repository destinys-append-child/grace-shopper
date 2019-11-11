import React from 'react'

import './user-profile.css'
import MyDetails from './mydetails'

class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  changeClassName() {}

  render() {
    return (
      <div id="user-profile">
        <h1>MY ACCOUNT</h1>
        <div className="ui secondary pointing menu">
          <a className="active item own-color">
            <i className="address card icon" /> My Details
          </a>
          <a className="item">
            <i className="lock icon" /> Change Password
          </a>
          <a className="item">
            <i className="box icon" /> My Orders
          </a>
        </div>
        <MyDetails />
      </div>
    )
  }
}

export default UserProfile
