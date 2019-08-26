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
      this.setState({countries: response})
    })
    this.checkboxWrapText.innerHTML = this.checkboxWrapText.innerHTML.replace('{privacy_policy}', `<a target='_blank' href=${_config.urls.privacy_policy}>${_config.translations[_config.data.lang].all_set.privacy_policy}</a>`)
  }
  handleRequest = () => {
    let sendSingUpData = {}
    sendSingUpData.added = getPrettyDate()
    sendSingUpData.email = this.props.email
    sendSingUpData.pass = this.props.pass
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
        window.location = window.location.origin + nextPath
      }
    })
  }

  render () {
    return (
      <div style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}bg-img.jpg#blur)`}} className='all-set'>
        <div className='all-set-wrap'>
          <form action={_config.urls.check_login} method='POST'>
            <div className='images-wrap'> 
              <img className='images-wrap__back' onClick={() => { this.props.history.goBack() }} src={_config.urls.static + 'ic_back.svg'} />
              <img className='images-wrap__background' src={_config.urls.static + 'sing-up-img.png'} />
            </div>
            <div className='all-set-form__text'>{_config.translations[_config.data.lang].all_set.we_all_set}</div>
            <span className='all-set-form__forgot'>
              {_config.translations[_config.data.lang].all_set.enjoy_your_choice}
            </span>
            <span className='all-set-form__forgot'>
              {_config.translations[_config.data.lang].all_set.you_can_continue}
            </span>
          </form>
          <div className='block-with-checkbox'>
            <div className={`checkbox-wrap send-information ${this.state.isPermitAds ? 'opacity' : ''}`} 
              onClick={()=> this.setState({isPermitAds: !this.state.isPermitAds})}>
              <input id='first' type='checkbox' 
                checked={this.state.isPermitAds} onChange={()=> {this.setState({isPermitAds: !this.state.isPermitAds})}} />
              <label htmlFor='first'>
                <span onClick={(e)=>e.preventDefault()}></span>
              </label>
              <span className='checkbox-wrap__text'>
                {_config.translations[_config.data.lang].all_set.send_important_information}
              </span>
            </div>
            <div className={`checkbox-wrap agree-to-all-terms ${this.state.isAgreeToAllTerms ? 'opacity' : ''}`} 
              ref={CheckBoxWrapAgree => this.CheckBoxWrapAgree = CheckBoxWrapAgree}
              onClick={()=> this.setState({isAgreeToAllTerms: !this.state.isAgreeToAllTerms})}>
              <input id='twice' type='checkbox'
                checked={this.state.isAgreeToAllTerms} />
              <label htmlFor='twice'>
                <span onClick={e => e.preventDefault()}></span>
              </label>
              <span className='checkbox-wrap__text' ref={checkboxWrapText => this.checkboxWrapText = checkboxWrapText}>
              {/* {_config.translations[_config.data.lang].all_set.agree_to_all_the_Terms.replace('{privacy_policy}', _config.translations[_config.data.lang].all_set.privacy_policy)} */}
              {_config.translations[_config.data.lang].all_set.agree_to_all_the_Terms}
              </span>
            </div>
          </div>
          <div className='start-button-wrap' onClick={() => {
            if (!this.state.isAgreeToAllTerms) {
              this.CheckBoxWrapAgree.classList.add('active')
            }
          }}>
            <StartButton route={() => this.handleRequest()} active={this.state.isAgreeToAllTerms} isStartLoad={this.state.isStartLoad}/>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AllSet)
