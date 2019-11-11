import React from 'react'

class MyDetails extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
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
                    name="first-name"
                    placeholder="First Name"
                  />
                </div>
                <div className="field">
                  <input type="text" name="last-name" placeholder="Last Name" />
                </div>
              </div>
            </div>
            <div className="field">
              <label>Gender</label>
              <div className="ui selection dropdown">
                <input type="hidden" name="gender" />
                <div className="default text">Gender</div>
                <i className="dropdown icon" />
                <div className="menu">
                  <div className="item" data-value="male">
                    Male
                  </div>
                  <div className="item" data-value="female">
                    Female
                  </div>
                  <div className="item" data-value="notDeclared">
                    I Prefer Not To Say
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default MyDetails
