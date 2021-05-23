import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import AllSet from '../all-set/all-set'
import SignUp from '../sign-up/sign-up'
import BusinessType from '../business-type/business-type'
import { postService } from '../../services/api_services'
import { getPrettyDate } from '../../services/helperServices'

const baseUrl = _config.baseUrl

class Home extends React.Component {
  state = {
    email: sessionStorage.getItem('atz_email') || '',
    pass: sessionStorage.getItem('atz_pass') || '',
    phone: sessionStorage.getItem('atz_phone') || '',
    finalRedirect: '',
    existingEmail: false,
    selectedBusinessIds: [],
    isPermitAds: true,
    isStartLoad: false,
    countries: {},
    anotherBusinessType: ''
  }

  handleEmailValue = ({ target }) => {
    const { value } = target
    this.setState({ email: value }, () => sessionStorage.setItem('atz_email', this.state.email))
  }

  handlePassValue = ({ target }) => {
    const { value } = target
    this.setState({ pass: value }, () => sessionStorage.setItem('atz_pass', this.state.pass))
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
    let body = `added=${getPrettyDate()}&email=${this.state.email?.trim()}&pass=${this.state.pass?.trim()}&phone=${encodeURIComponent(this.state.phone?.trim()) || null}&permit_ads=${this.state.isPermitAds}&business_types=[${this.state.selectedBusinessIds}]&lang=${_config.data.lang}&timezone=${this.state.countries.timezone}&country=${this.state.countries.country}&city=${this.state.countries.city}`
    if (this.state.selectedBusinessIds.includes(_config.other_business_type_id) && this.state.anotherBusinessType) {
      body = body + `&another_business_type_id=${this.state.anotherBusinessType}`
    }
    this.setState({ isStartLoad: true })
    postService(_config.urls.signup_post, body).then(r => {
      if (r.status === 201) {
        r.text().then(nextPath => {
          if (nextPath) {
            location.href = window.location.origin + nextPath
          }
        })
      }
      if (r.status === 422) {
        this.setState({
          existingEmail: true
        }, () => {
          this.props.history.push({
            pathname: baseUrl,
            search: window.location.search
          })
        })
      }
    })
  }

  handleBusinessType = val => {
    this.setState({ anotherBusinessType: val })
  }

  render() {
    return (
      <div id='home'>
        <Switch>
          <Route exact path={baseUrl} render={() => <SignUp {...this.state} existingEmail={this.state.existingEmail} onHandlePhoneValue={this.handlePhoneValue} onHandlePassValue={this.handlePassValue} onHandleEmailValue={this.handleEmailValue} />} />
          <Route path={baseUrl + _config.routing.business_type_path} render={() => <BusinessType {...this.state} onHandleBusinessIds={this.handleBusinessIds} onHandleBusinessType={this.handleBusinessType} />} />
          <Route path={baseUrl + _config.routing.all_set_path} render={() => <AllSet {...this.state} isStartLoad={this.state.isStartLoad} onHandleCountriesValue={this.handleCountriesValue} onHandleChangeAds={this.handleChangeAds} onHandleRequest={this.handleRequest} />} />
          <Redirect from='/' to={baseUrl} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Home)
