import React from 'react'
import {Link} from 'react-router-dom'
import UserDetails from './userDetails'
import Orders from './orders'
import '../css/user-profile.css'

const UserProfile = props => {
  return (
    <div id="user-profile">
      <h1>MY ACCOUNT</h1>
      <div className="ui secondary pointing menu">
        <Link to="/profile/userDetails" className="item" value="userDetails">
          <i className="address card icon" /> My Details
        </Link>
        <Link to="/profile/orders" className="item" value="orders">
          <i className="box icon" /> My Orders
        </Link>
      </div>
      <div>
        {props.match.params.page === 'orders' ? (
          <Orders isLoggedIn={props.isLoggedIn} />
        ) : null}
        {props.match.params.page === 'userDetails' ? <UserDetails /> : null}
      </div>
    </div>
  )
}

export default UserProfile
