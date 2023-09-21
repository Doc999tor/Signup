import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Slideshow from '../../components/logo-animation'
import ExistingEmail from '../../components/existing_email'
import { postValidateService, postService } from '../../services/api_services'

import './sign-up.less'

const baseUrl = _config.baseUrl
class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      incorrectNumber: false,
      isVisiblePass: false,
      isValidEmail: true,
      isValidPass: true,
      existingEmail: false,
      loader: false,
      phone: null,
      errMessage: (() => {
        // when loading the constructor, check url for an error
        let params = (new URL(document.location)).searchParams
        let error = params.get(_config.routing.url_params.error)
        if (error === _config.routing.url_params.values.incorrect) {
          return _config.translations[_config.data.lang].sign_in.error_incorrect
        } else {
          return ''
        }
      })()
    }
  }

  componentDidMount() {
    if (this.props.phone?.trim() !== '') {
      this.setState({ phone: this.props.phone?.trim() })
    }
  }

  // toggle password -> show/hide
  togglePass = () => this.setState(prevState => ({ isVisiblePass: !prevState.isVisiblePass }))

  checkEmail = () => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    // email empty
    if (!this.props.email.trim()) {
      this.setState({ isValidEmail: false, errMessage: _config.translations[_config.data.lang].sign_in.missing_email })
      return false
    }
    if (!re.test(this.props.email.trim())) {
      this.setState({ isValidEmail: false, errMessage: _config.translations[_config.data.lang].sign_in.wrong_email })
      return false
    }
    if (re.test(this.props.email.trim())) {
      this.setState({ errMessage: '', isValidEmail: true })
      return true
    }
  }

  checkPassword = () => {
    let minPassLength = 3
    // pass epmty
    if (this.props.pass.trim() === '') {
      this.setState({ isValidPass: false, errMessage: _config.translations[_config.data.lang].sign_in.missing_password })
      return false
    } else if (this.props.pass.trim().length < minPassLength) {
      this.setState({ isValidPass: false, errMessage: _config.translations[_config.data.lang].sign_in.password_short })
      return false
    } else {
      this.setState({isValidPass: true, errMessage: ''})
      return true
    }
  }

  handleChangePhone = e => {
    const value = e.target.value
    this.setState({
      phone: value,
      incorrectNumber: false
    }, () => this.props.onHandlePhoneValue(this.state.phone))
  }

  handleCheckPhone = () => {
    if (this.props.phone === 'null' || this.props.phone === null || this.props.phone?.trim() === '') {
      return true
    }
    return this.props.phone?.trim() !== '' && !this.state.incorrectNumber;
  }

  handlePhoneValidation = phone => {
    const url = _config.urls.validate_api
    const body = `phone=${phone?.trim()}`

    return postValidateService(body, url)
      .then(({ status }) => {
        if (status === 200) {
          this.setState({
            incorrectNumber: false
          })
          return true
        }
        if (status === 422) {
          this.setState({
            incorrectNumber: true,
            loader: false
          })
          return false
        }
      })
  }

  handleCheckEmail = () => {
    const body = `email=${encodeURIComponent(this.props.email.trim())}&pass=${encodeURIComponent(this.props.pass.trim())}`
    return postService(_config.urls.api_check_email, body).then(r => {
      if (r.status === 409 || r.status === 302) {
        this.setState({
          existingEmail: true,
          loader: false,
        }, () => {
          this.props.history.push({
            pathname: baseUrl,
            search: window.location.search
          })
        })
      } else if (r.status === 404) {
        this.setState({
          existingEmail: false,
        }, () => {
          this.props.history.push(_config.baseUrl + _config.routing.business_type_path)
        })
      }
    })
  }

  handleGoToBusinessType = () => {
    if (this.checkEmail() && this.checkPassword() && this.handleCheckPhone()) {
      this.handleCheckEmail()
    } else {
      this.handleCheckEmail()
    }
  }

  handleSubmitForm = e => {
    e.preventDefault()
    this.setState({ loader: true })

    if (!this.state.isValidEmail) {
      return
    }

    if (this.state.phone !== 'null' && this.state.phone !== null && this.state.phone?.trim() !== '') {
      this.handlePhoneValidation(this.state.phone).then(isValid => {
        if (isValid) {
          this.handleGoToBusinessType()
        }
      })
      return
    }
    this.handleGoToBusinessType()
  }

  render() {
    const { business_name, email, pass, existingEmail, onHandleEmailValue, onHandlePassValue, onChangeBusinessNameValue } = this.props
    const { incorrectNumber, phone, isVisiblePass } = this.state

    return (
      <div className='sign-up'>
        <div className='main-content'>
          <div style={{backgroundImage: 'linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)'}} className='bottom_bgr'>
            <img className='wave' src={_config.urls.static + 'wave.svg'} alt='' />
            {!existingEmail && !this.state.existingEmail
              ? <Slideshow />
              : <ExistingEmail />}
          </div>
          <div className='sign-up-wrap'>
            <div className='title-container'>
              <h1>{_config.translations[_config.data.lang].sign_up.main_title}</h1>
            </div>
            <div className='subtitle-container'>
              <p>{_config.translations[_config.data.lang].sign_up.subtitle}</p>
            </div>
            <form onSubmit={this.handleSubmitForm}>
              <div className='text-content-wrap'>
                <div className={`group email ${this.state.isValidEmail ? '' : 'err'} ${existingEmail || this.state.existingEmail ? 'existing_email' : ''}`}>
                  <img
                    className='group__email'
                    alt=''
                    src={_config.urls.static + (this.state.isValidEmail && !existingEmail && !this.state.existingEmail ? 'ic_email.svg' : 'ic_email-error.svg')}
                  />
                  <input type='email'
                    name='email'
                    value={email}
                    onChange={onHandleEmailValue}
                    // if the password and email are empty then we do not do an additional check
                    onBlur={this.checkEmail}
                    className={`group__input ${this.state.isValidEmail ? '' : 'err'}`}
                    placeholder={_config.translations[_config.data.lang].sign_in.enter_email}
                    autoComplete='username' />
                </div>
                <div className={`group password ${this.state.isValidPass ? '' : 'err'}`}>
                  <img
                    className='group__lock'
                    alt=''
                    src={_config.urls.static + (this.state.isValidPass ? 'ic_pass.svg' : 'ic_pass-error.svg')}
                  />
                  <input
                    type={isVisiblePass ? 'text' : 'password'}
                    name='new-password'
                    value={pass}
                    onChange={onHandlePassValue}
                    // if the password and email are empty then we do not do an additional check
                    onBlur={this.checkPassword}
                    // ref={pass => this.pass = pass}
                    className={`group__input password ${this.state.isValidPass ? '' : 'err'}`}
                    data-type='password'
                    autoComplete='new-password'
                    placeholder={_config.translations[_config.data.lang].sign_in.enter_password}
                  />
                  {this.props.pass && <img
                    className='group__eye'
                    onClick={this.togglePass}
                    alt=''
                    src={`${_config.urls.static}${isVisiblePass ? 'eye-off' : 'eye'}.svg`} />}
                </div>
                <div className={'group' + (!incorrectNumber ? '' : ' err_phone')}>
                  <img className='phone_img' src={_config.urls.static + 'ic_phone.svg'} alt='' />
                  <input
                    type='tel'
                    name='phone'
                    value={phone}
                    className='group__input input_phone'
                    onChange={this.handleChangePhone}
                    placeholder={_config.translations[_config.data.lang].sign_in.enter_phone}
                  />
                </div>
                <div className='group'>
                  <div className='image_wrap'>
                    <img className='phone_img' src={_config.urls.static + 'briefcase.svg'} alt='' />
                  </div>
                  <input
                    type='text'
                    name='business_name'
                    value={business_name || sessionStorage.getItem('atz_business_name')?.trim()}
                    className='group__input'
                    onChange={onChangeBusinessNameValue}
                    placeholder={_config.translations[_config.data.lang].sign_in.enter_business_name}
                  />
                </div>
                <div className='login-err'>
                  {this.state.errMessage && <img className='login-err__img' src={_config.urls.static + 'vector.svg'} alt='' />}
                  <span className='login-err__text'>{this.state.errMessage}</span>
                </div>
                <div id='g-recaptcha-response' name='g-recaptcha-response' className='g-recaptcha' data-size='invisible' data-sitekey={_config.recaptcha_v2} />
              </div>
              <button className='login-form__button login-button' type='submit'>
                {this.state.loader
                  ? <img className='loader' src={_config.urls.static + 'preloader.svg'} alt='' />
                  : <span>{_config.translations[_config.data.lang].sign_up.continue}</span>
                }
              </button>
            </form>
          </div>
        </div>
        <div className='sup-wrap'>
          <div className='question-container'>
            <a href={_config.urls.login} className='sign-up-question'>
              <span>{_config.translations[_config.data.lang].sign_up.have_acc_already}</span>
              <span className='login_label'>{_config.translations[_config.data.lang].sign_up.login_in}</span>
            </a>
          </div>
          <a href={_config.urls.contact_us} className='contact_us_link' target='_blank'>
            <span className='link_text'>{_config.translations[_config.data.lang].sign_up.contact_us_link_label}</span>
            <span className='help'><img src={`${_config.urls.static}ic_help.svg`} alt='help' /></span>
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
