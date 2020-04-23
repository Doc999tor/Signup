import React, {Component} from 'react'
import {apiServices, getPrettyDate} from 'services'
import { withRouter } from 'react-router-dom'
import StartButton from '../../components/start-button/start-button.jsx'

import './all-set.less'

class AllSet extends Component {
  state = {
    isPermitAds: false,
    isAgreeToAllTerms: false,
    countries: {},
    isStartLoad: false
  }
  componentDidMount () {
    apiServices.get(_config.urls.countries_get).then(response => {
      if (response) {
        this.setState({countries: response})
      }
    }).catch(err => {
      console.log(`countries were not uploaded. Error: ${err}`)
    })
    // this.checkboxWrapText.innerHTML = this.checkboxWrapText.innerHTML.replace('{privacy_policy}', `<a target='_blank' href=${_config.urls.privacy_policy}>${_config.translations[_config.data.lang].all_set.privacy_policy}</a>`)
  }
  handleRequest = () => {
    let sendSingUpData = {}
    sendSingUpData.added = getPrettyDate()
    sendSingUpData.email = this.props.email
    sendSingUpData.pass = this.props.pass
    sendSingUpData.phone = this.props.phone
    sendSingUpData.permit_ads = this.state.isPermitAds
    sendSingUpData.business_types = '[' + this.props.selectedBusinessIds + ']'
    sendSingUpData.lang = _config.data.lang
    sendSingUpData.timezone = this.state.countries.timezone
    sendSingUpData.country = this.state.countries.country
    sendSingUpData.city = this.state.countries.city

    if (this.props.selectedBusinessIds.includes(_config.other_business_type_id) && this.props.anotherBusinessType) { 
      sendSingUpData.another_business_type_id = this.props.anotherBusinessType
    }
    this.setState({isStartLoad: true})
    apiServices.post(_config.urls.base + _config.urls.signup_post, {
      params: sendSingUpData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then(nextPath => {
      this.setState({isStartLoad: false})
      if (nextPath) {
        this.props.onHandleFinalRedirectValue(nextPath)
        this.props.history.push({
          pathname: window.REACT_ROUTER_BASENAME + _config.onboarding_pages[0].path,
          search: window.location.search
        })
      }
    })
  }
  backButton = () => this.props.history.goBack()

  handleChangeAds = () => this.setState({isPermitAds: !this.state.isPermitAds})
  handleChangeAgree = () => this.setState({isAgreeToAllTerms: !this.state.isAgreeToAllTerms})
  render () {
    return (
      <div className='all-set'>
        <div className='all-set-wrap'>
          <div className='all-set-header'>
            <img className='images-wrap__back' onClick={this.backButton} src={_config.urls.static + 'ic_back.svg'} />
          </div>
          <div className='images-wrap'> 
            <img className='images-wrap__background' src={_config.urls.static + 'ill_background.svg'} />
            <img className='images-wrap__woman' src={_config.urls.static + 'ill_woman.png'} />
          </div>
          <h2 className='all-set-form__text'>{_config.translations[_config.data.lang].all_set.we_all_set}</h2>
          <span className='all-set-form__forgot'>
            {_config.translations[_config.data.lang].all_set.enjoy_your_choice}
          </span>
          <div className='block-with-checkbox'>
            <div className='checkbox-wrap' 
              // onClick={this.handleChangeAds}
              >
              <input id='first' type='checkbox' 
                value={this.state.isPermitAds}
                onChange={this.handleChangeAds} />
              <label htmlFor='first'>
                {_config.translations[_config.data.lang].all_set.send_important_information}
              </label>
            </div>
            <div className='checkbox-wrap'>
              <input id='twice' type='checkbox'
                value={this.state.isAgreeToAllTerms}
                onChange={this.handleChangeAgree} />
              <label className='combined' htmlFor='twice'>
                <span>{_config.translations[_config.data.lang].all_set.agree_to_all_the_Terms}</span>
                <a className='term-link' target='_blank' href={_config.urls.privacy_policy}>{_config.translations[_config.data.lang].all_set.privacy_policy}</a>
              </label>
            </div>
          </div>
          <StartButton route={() => this.handleRequest()} active={this.state.isAgreeToAllTerms && this.state.countries.country} isStartLoad={this.state.isStartLoad}/>
        </div>
      </div>
    )
  }
}

export default withRouter(AllSet)
