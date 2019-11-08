import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'

import './home.css'

const Home = ({isLoggedIn, firstName, history}) => {
  return (
    <div id="home">
      {isLoggedIn ? <div>Let's set Sail {firstName}</div> : null}
      <Button
        inverted
        color="white"
        onClick={() => history.push('/categories')}
      >
        TAKE ME AWAY
      </Button>
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
