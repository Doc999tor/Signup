import React from 'react'
import SignUp from '../sign-up/sign-up'

export default () => {
  // state = {
  //   name: '',
  //   phone: '',
  // }

  // handleNameValue = value => this.setState({ name: value })

  // handlePhoneValue = value => this.setState({ phone: value })


  return (
    <div id='home'>
      <SignUp
        // onHandlePhoneValue={this.handlePhoneValue}
        // onHandleEmailValue={this.handleEmailValue}
        // onhandleNameValue={this.handleNameValue}
        // onHandlePassValue={this.handlePassValue}
        // {...this.state}
      />
    </div>
  )
}
