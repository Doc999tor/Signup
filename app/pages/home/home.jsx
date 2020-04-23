import React from 'react'
import AllSet from '../all-set/all-set.jsx'
import SignUp from '../sign-up/sign-up.jsx'
import Onboarding from '../onboarding/index.jsx'
import BusinessType from '../business-type/business-type.jsx'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const baseUrl = window.REACT_ROUTER_BASENAME

class Home extends React.Component {
  state = {
    email: sessionStorage.getItem('atz_email') || '',
    pass: sessionStorage.getItem('atz_pass') || '',
    phone: sessionStorage.getItem('atz_phone') || null,
    finalRedirect: '',
    selectedBusinessIds: [],
    anotherBusinessType: ''
  }

  handleEmailValue = v => {
    this.setState({email: v}, () => sessionStorage.setItem('atz_email', this.state.email))
  }

  handlePassValue = v => {
    this.setState({pass: v}, () => sessionStorage.setItem('atz_pass', this.state.pass))
  }

  handlePhoneValue = value => this.setState({phone: value}, () => sessionStorage.setItem('atz_phone', this.state.phone))

  handleFinalRedirectValue = value => this.setState({finalRedirect: value})

  handleBusinessIds = id => {
    if (this.state.selectedBusinessIds.includes(id)) {
      this.setState({
        selectedBusinessIds: [...this.state.selectedBusinessIds].filter(item => (item !== id))
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
            <Route path={baseUrl + _config.routing.all_set_path} render={() => <AllSet {...this.state} onHandleFinalRedirectValue={this.handleFinalRedirectValue} />} />
            {_config.onboarding_pages.map((page, index) => <Route key={page.name} path={baseUrl + page.path} render={() => <Onboarding {...this.state} name={page.name} icon={page.icon} nextRoute={_config.onboarding_pages[index + 1] ? _config.onboarding_pages[index + 1].path : this.state.finalRedirect} text={page.text} items={_config.onboarding_pages.length} />} />)}
            <Redirect from='/' to={baseUrl} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Home
