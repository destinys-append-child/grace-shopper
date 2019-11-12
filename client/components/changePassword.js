import React from 'react'

const ChangePassword = () => {
  return (
    <form className="ui form">
      <div className="field">
        <label>Current Password</label>
        <input
          type="pasword"
          name="currentPassword"
          placeholder="Current Password"
        />
      </div>
      <div className="field">
        <label>New Password</label>
        <input type="password" name="newPassword" placeholder="New Password" />
      </div>
      <button className="ui button" type="submit">
        Submit
      </button>
    </form>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const inputs = {
        currentPassword: evt.target.currentPassword.value,
        newPassword: evt.target.newPassword.value
      }
    }
  }
}

export default ChangePassword
