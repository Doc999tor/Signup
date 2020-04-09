import React from 'react'
import AllSet from '../all-set/all-set.jsx'
import SignUp from '../sign-up/sign-up.jsx'
import BusinessType from '../business-type/business-type.jsx'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const baseUrl = window.REACT_ROUTER_BASENAME

class Home extends React.Component {
  state = {
    email: '',
    pass: '',
    phone: null,
    selectedBusinessIds: [],
    anotherBusinessType: ''
  }
  
  handleEmailValue = (v) => {
    this.setState({email: v})
  }
  handlePassValue = (v) => {
    this.setState({pass: v})
  }

  handlePhoneValue = value => this.setState({phone: value})
  
  handleBusinessIds = (id) => {
    if (this.state.selectedBusinessIds.includes(id)) {
      this.setState({
        selectedBusinessIds: [...this.state.selectedBusinessIds].filter((item) => (item !== id))
      })
    } else {
      this.setState({
        selectedBusinessIds: [...this.state.selectedBusinessIds, id]
      })
    }
  }
  handleBusinessType = val => {
    this.setState({anotherBusinessType: val})
  }
  render () {
    return (
      <div id='home'>
        <BrowserRouter>
          <Switch>
            <Route exact path={baseUrl + _config.routing.sign_up_path} render={() => <SignUp {...this.state} onHandlePhoneValue={this.handlePhoneValue} onHandlePassValue={this.handlePassValue} onHandleEmailValue={this.handleEmailValue} />} />
            <Route path={baseUrl + _config.routing.business_type_path} render={() => <BusinessType {...this.state} onHandleBusinessIds={this.handleBusinessIds} onHandleBusinessType={this.handleBusinessType} />} />
            <Route path={baseUrl + _config.routing.all_set_path} render={() => <AllSet {...this.state} />} />
            <Redirect from='/' to={baseUrl} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Home
