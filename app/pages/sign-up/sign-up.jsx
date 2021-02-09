import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Slideshow from '../../components/logo-animation'
import ExistingEmail from '../../components/existing_email'
import { postValidateService } from '../../services/api_services'

import './sign-up.less'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      statusOutsideValidation: false,
      incorrectNumber: false,
      isVisiblePass: false,
      isValidEmail: true,
      isValidPass: true,
      phone: null,
      validPhone: true,
      passValue: '',
      emailValue: '',
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

  // toggle password -> show/hide
  togglePass = () => this.setState(prevState => ({ isVisiblePass: !prevState.isVisiblePass }))

  checkEmail = () => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    // mail epmty
    if (this.props.email === '') {
      this.setState({isValidEmail: false, errMessage: _config.translations[_config.data.lang].sign_in.missing_email})
      return false
    }
    if (!re.test(this.props.email.trim())) {
      this.setState({isValidEmail: false, errMessage: _config.translations[_config.data.lang].sign_in.wrong_email})
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
      this.setState({isValidPass: false, errMessage: _config.translations[_config.data.lang].sign_in.missing_password})
      return false
    } else if (this.props.pass.trim().length < minPassLength) {
      this.setState({isValidPass: false, errMessage: _config.translations[_config.data.lang].sign_in.password_short})
      return false
    } else {
      this.setState({isValidPass: true, errMessage: ''})
      return true
    }
  }

  handleChangePhone = e => {
    const value = e.target.value
    const reg = /^[\s\d()\-*#+]+$/
    this.setState({
      phone: value
    }, () => this.props.onHandlePhoneValue(this.state.phone))
  }

  handleCheckPhone = () => {
    if (this.props.phone === 'null' || this.props.phone === null || this.props.phone?.trim() === '') {
      return true
    }
    if (this.props.phone?.trim() !== '' && !this.state.statusOutsideValidation && !this.state.incorrectNumber) {
      return true
    }
    return false
  }

  handleBlurPhone = ({ target }) => {
    const { value } = target
    if (value) {
      const url = _config.urls.validate_api
      const body = `phone=${value}`
      this.setState({
        statusOutsideValidation: true
      })
      postValidateService(body, url)
        .then(({ status }) => {
          if (status === 200) {
            this.setState({
              incorrectNumber: false
            })
          }
          if (status === 422) {
            this.setState({
              incorrectNumber: true
            })
          }
        })
        .catch(error => console.log({ error }))
        .finally(() => this.setState({
          statusOutsideValidation: false
        }))
    }
  }

  handleGoToBusinessType = e => {
    e.preventDefault()
    this.checkPassword() && this.checkEmail() && this.props.onCheckEmail()
    this.handleCheckPhone() && this.checkPassword() && this.checkEmail() && this.props.history.push(_config.baseUrl + _config.routing.business_type_path)
  }

  render() {
    const { email, pass, existingEmail, onHandleEmailValue, onHandlePassValue } = this.props
    const { incorrectNumber, phone, isVisiblePass } = this.state
    return (
      <div className='sign-up'>
        <div className='main-content'>
          <div style={{backgroundImage: `linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)`}} className='bottom_bgr'>
            <img className='wave' src={_config.urls.static + 'wave.svg'} alt='' />
            {!existingEmail
              ? <Slideshow />
              : <ExistingEmail />}
          </div>
          <div className='sign-up-wrap'>
            <div className='title-container'>
              <h1>{_config.translations[_config.data.lang].sign_up.main_title}</h1>
            </div>
            <div className='question-container'>
              <a href={ _config.urls.login } className='sign-up-question'><span>{_config.translations[_config.data.lang].sign_up.have_acc_alredy}</span><span className='login_label'>{_config.translations[_config.data.lang].sign_up.login_in}</span></a>
            </div>
            <form onSubmit={this.handleGoToBusinessType}>
              <div className='text-content-wrap'>
                <div className={`group email ${this.state.isValidEmail ? '' : 'err'} ${existingEmail ? 'existing_email' : ''}`}>
                  <img
                    className='group__email'
                    alt=''
                    src={_config.urls.static + (this.state.isValidEmail && !existingEmail ? 'ic_email.svg' : 'ic_email-error.svg')}
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
                    value={phone || sessionStorage.getItem('atz_phone')?.trim()}
                    className='group__input input_phone'
                    onChange={this.handleChangePhone}
                    onBlur={this.handleBlurPhone}
                    placeholder={_config.translations[_config.data.lang].sign_in.enter_phone}
                  />
                </div>
                <div className='login-err'>
                  {this.state.errMessage && <img className='login-err__img' src={_config.urls.static + 'vector.svg'} alt='' />}
                  <span className='login-err__text'>{this.state.errMessage}</span>
                </div>
                <div id='g-recaptcha-response' name='g-recaptcha-response' className='g-recaptcha' data-size='invisible' data-sitekey={_config.recaptcha_v2} />
              </div>
              <button className='login-form__button login-button' type='submit'>
                {_config.translations[_config.data.lang].sign_up.continue}
              </button>
            </form>
          </div>
        </div>
        <div className='sup-wrap'>
          <a href={_config.urls.contact_us} className='contact_us_link'>
            <span className='link_text'>{_config.translations[_config.data.lang].sign_up.contact_us_link_label}</span>
            <span className='help'><img src={`${_config.urls.static}ic_help.svg`} alt='help' /></span>
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
