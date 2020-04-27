import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import AllSet from '../all-set/all-set'
import SignUp from '../sign-up/sign-up'
import Onboarding from '../onboarding/index'
import BusinessType from '../business-type/business-type'
import { post } from '../../services/apiServices'
import { getPrettyDate } from '../../services/helperServices'

const baseUrl = _config.baseUrl

class Home extends React.Component {
  state = {
    email: sessionStorage.getItem('atz_email') || '',
    pass: sessionStorage.getItem('atz_pass') || '',
    phone: sessionStorage.getItem('atz_phone') || null,
    finalRedirect: '',
    selectedBusinessIds: [],
    isPermitAds: false,
    isStartLoad: false,
    countries: {},
    anotherBusinessType: ''
  }

  handleEmailValue = v => {
    this.setState({ email: v }, () => sessionStorage.setItem('atz_email', this.state.email))
  }

  handlePassValue = v => {
    this.setState({ pass: v }, () => sessionStorage.setItem('atz_pass', this.state.pass))
  }

  handlePhoneValue = value => this.setState({phone: value}, () => sessionStorage.setItem('atz_phone', this.state.phone))

  handleFinalRedirectValue = value => this.setState({ finalRedirect: value })

  handleCountriesValue = value => this.setState({countries: value})

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

  handleChangeAds = () => this.setState({ isPermitAds: !this.state.isPermitAds })

  handleRequest = () => {
    const sendSingUpData = {}
    sendSingUpData.added = getPrettyDate()
    sendSingUpData.email = this.state.email
    sendSingUpData.pass = this.state.pass
    sendSingUpData.phone = this.state.phone
    sendSingUpData.permit_ads = this.state.isPermitAds
    sendSingUpData.business_types = '[' + this.state.selectedBusinessIds + ']'
    sendSingUpData.lang = _config.data.lang
    sendSingUpData.timezone = this.state.countries.timezone
    sendSingUpData.country = this.state.countries.country
    sendSingUpData.city = this.state.countries.city

    if (this.state.selectedBusinessIds.includes(_config.other_business_type_id) && this.state.anotherBusinessType) { 
      sendSingUpData.another_business_type_id = this.state.anotherBusinessType
    }
    this.setState({ isStartLoad: true });
    post(_config.urls.base + _config.urls.signup_post, {
      params: sendSingUpData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(nextPath => {
      this.setState({ isStartLoad: false })
      if (nextPath) {
        this.setState({ finalRedirect: nextPath })
      }
    })
    this.props.history.push({
      pathname: _config.baseUrl + _config.onboarding_pages[0].path,
      search: window.location.search
    })
  }

  handleBusinessType = val => {
    this.setState({ anotherBusinessType: val })
  }

  render() {
    return (
      <div id='home'>
        <Switch>
          <Route exact path={baseUrl + _config.routing.sign_up_path} render={() => <SignUp {...this.state} onHandlePhoneValue={this.handlePhoneValue} onHandlePassValue={this.handlePassValue} onHandleEmailValue={this.handleEmailValue} />} />
          <Route path={baseUrl + _config.routing.business_type_path} render={() => <BusinessType {...this.state} onHandleBusinessIds={this.handleBusinessIds} onHandleBusinessType={this.handleBusinessType} />} />
          <Route path={baseUrl + _config.routing.all_set_path} render={() => <AllSet {...this.state} onHandleCountriesValue={this.handleCountriesValue} onHandleChangeAds={this.handleChangeAds} onHandleRequest={this.handleRequest} />} />
          {_config.onboarding_pages.map((page, index) => <Route key={page.name} isStartLoad={this.state.isStartLoad} path={baseUrl + page.path} render={() => <Onboarding {...this.state} name={page.name} icon={page.icon} nextRoute={_config.onboarding_pages[index + 1] ? _config.onboarding_pages[index + 1].path : this.state.finalRedirect} text={page.text} />} />)}
        </Switch>
      </div>
    )
  }
}

export default withRouter(Home)
