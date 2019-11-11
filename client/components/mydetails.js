import React from 'react'

import './mydetails.css'

class MyDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  render() {
    return (
      <div id="my details">
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
            <input type="text" name="lastName" placeholder="Last Name" />
          </div>
        </form>
      </div>
    )
  }
}

export default MyDetails
