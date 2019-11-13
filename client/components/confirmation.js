import React, {Component} from 'react'

import '../css/confirmation.css'

class Confirmation extends Component {
  componentDidMount() {
    localStorage.clear()
  }

  render() {
    return (
      <div>
        <div className="confirmation">
          <h1 id="cursive">CONGRATULATIONS! ORDER CONFIRMED:</h1>
          <h2 id="cursive">
            Your yacht(s) are being *shipped to you at this very moment!
          </h2>
          <h2 id="final">Happy Sailing :)</h2>
          <img src="https://i.pinimg.com/474x/1a/67/15/1a671577182d2146add4ee1a97dc14c4.jpg" />
        </div>
      </div>
    )
  }
}

export default Confirmation
