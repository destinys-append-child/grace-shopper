import React from 'react'
import {Link} from 'react-router-dom'
import './user-profile.css'
import MyDetails from './mydetails'

class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: false
    }
  }

  render() {
    const {activeItem} = this.state

    return (
      <div id="user-profile">
        <h1>MY ACCOUNT</h1>
        <div className="ui secondary pointing menu">
          <a className="item">
            <i className="address card icon" /> My Details
          </a>
          <a className="item">
            <i className="lock icon" /> Change Password
          </a>
          <Link to="/orders" className="item">
            <i className="box icon" /> My Orders
          </Link>
        </div>
        <MyDetails />
      </div>
    )
  }
}

export default UserProfile
