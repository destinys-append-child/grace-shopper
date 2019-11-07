import React from 'react'
import {connect} from 'react-redux'

const Home = ({isLoggedIn, firstName}) => {
  return (
    <div id="home">
      {isLoggedIn ? <div>Let's set Sail {firstName}</div> : null}
      <button type="button" onClick="()=>">
        TAKE ME AWAY
      </button>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(Home)
