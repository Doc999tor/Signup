import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { get } from '../../services/apiServices'
import StartButton from '../../components/start-button/start-button'

import './all-set.less'

class AllSet extends Component {
  state = {
    countries_success: false,
    isAgreeToAllTerms: true,
    makeChoose: false
  }

  componentDidMount() {
    get(_config.urls.countries_get).then(response => {
      if (response) {
        this.props.onHandleCountriesValue(response)
        this.setState({ countries_success: true })
      }
    }).catch(err => {
      console.log(`countries were not uploaded. Error: ${err}`)
    })
  }

  backButton = () => this.props.history.goBack()

  handleChangeAgree = () => this.setState({ isAgreeToAllTerms: !this.state.isAgreeToAllTerms })

  handleMakeChoose = () => {
    this.setState({ makeChoose: true })
  }

  render() {
    const { isAgreeToAllTerms, makeChoose } = this.state
    return (
      <div className='all-set'>
        <div className='all-set-wrap'>
          <div className='all-set-header'>
            <img className='images-wrap__back' onClick={this.backButton} src={_config.urls.static + 'ic_back.svg'} />
          </div>
          <div className='images-wrap'>
            <img className='images-wrap__background' src={_config.urls.static + 'ill_background.svg'} />
            <img className='images-wrap__woman' src={_config.urls.static + 'ill_woman@3x.png'} />
          </div>
          <h2 className='all-set-form__text'>{_config.translations[_config.data.lang].all_set.we_all_set}</h2>
          <span className='all-set-form__forgot'>
            {_config.translations[_config.data.lang].all_set.enjoy_your_choice}
          </span>
          <div className='block-with-checkbox'>
            <label htmlFor='first' className='checkbox-wrap'>
              <input id='first' type='checkbox'
                className={makeChoose ? 'makeChoose' : 'normal'}
                value={this.props.isPermitAds}
                checked={ this.props.isPermitAds }
                onChange={this.props.onHandleChangeAds} />
              <p>
                {_config.translations[_config.data.lang].all_set.send_important_information}
              </p>
            </label>
            <label className='checkbox-wrap' htmlFor='twice'>
              <input className={makeChoose ? 'makeChoose' : 'normal'} id='twice' type='checkbox'
                value={isAgreeToAllTerms}
                checked={ isAgreeToAllTerms }
                onChange={this.handleChangeAgree}
              />
              <p className='combined' htmlFor='twice'>
                <span>{_config.translations[_config.data.lang].all_set.agree_to_all_the_Terms}</span>
                <a className='term-link' target='_blank' href={_config.urls.privacy_policy}>{_config.translations[_config.data.lang].all_set.privacy_policy}</a>
              </p>
            </label>
          </div>
          <div id="legalLinks-container">
            {
              _config.legalLinks.map(
                l => <a href={ l.link } target="_blank">{ l.text }</a>
              )
            }
          </div>
          <StartButton onMakeChoose={this.handleMakeChoose} makeChoose={makeChoose} isStartLoad={this.props.isStartLoad} route={this.props.onHandleRequest} active={this.props.isPermitAds && isAgreeToAllTerms && this.state.countries_success} />
        </div>
      </div>
    )
  }
}

export default withRouter(AllSet)
