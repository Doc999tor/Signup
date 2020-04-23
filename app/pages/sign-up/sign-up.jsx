import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

import './sign-up.less'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
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

  componentDidMount () {
    // recaptcha v3
    // loadJS(`https://www.google.com/recaptcha/api.js?render=${_config.recaptcha_v3}`, document.body)
    // recaptcha v2
    // loadJS('https://www.google.com/recaptcha/api.js', document.body)

  }
  // toggle password -> show/hide
  togglePass = () => {
    let inputPass = this.pass
    if (inputPass.type === 'password') {
      inputPass.type = 'text'
      this.setState({isVisiblePass: true})
    } else {
      this.setState({isVisiblePass: false})
      inputPass.type = 'password'
    }
  }
  // check email and pass values
  checkPassAndEmail = () => {
    // if password and email empty
    if (this.props.email === '' && this.props.pass === '') {
      this.setState({isValidEmail: false, isValidPass: false, errMessage: _config.translations[_config.data.lang].sign_in.enter_email_pass})
      return false
    } else { return true }
  }
  checkEmail = () => {
    // mail epmty
    if (this.props.email === '') {
      this.setState({isValidEmail: false, errMessage: _config.translations[_config.data.lang].sign_in.missing_email})
      return false
    } else {
      // mail not valid (if not: @, .)
      let checkMail = () => {
        if (this.props.email.indexOf('@') == -1 || this.props.email.indexOf('.') == -1) {
          return true
        }
      }
      if (checkMail()) {
        this.setState({isValidEmail: false, errMessage: _config.translations[_config.data.lang].sign_in.wrong_email})
        return false
      } else {
        this.setState({errMessage: '', isValidEmail: true})
        return true
      }
    }
  }

  checkPassword = () => {
    let minPassLength = 3
    // pass epmty
    if (this.props.pass === '') {
      this.setState({isValidPass: false, errMessage: _config.translations[_config.data.lang].sign_in.missing_password})
      this.checkPassAndEmail()
      return false
    } else if (this.props.pass.length < minPassLength) {
      this.setState({isValidPass: false, errMessage: _config.translations[_config.data.lang].sign_in.password_short})
      return false
    } else {
      this.setState({isValidPass: true, errMessage: ''})
      return true
    }
  }

  handleChangePhone = e => {
    const value = e.target.value
    const reg = /(^[0-9-+]+$)/
    this.setState({
      phone: value,
      validPhone: value ? reg.test(value.trim()) : true
    }, () => this.props.onHandlePhoneValue(this.state.phone || null))
  }

  handleGoToBusinessType = () => {
    this.checkPassword() && this.checkEmail() && this.checkPassAndEmail() && this.props.history.push(window.REACT_ROUTER_BASENAME + _config.routing.business_type_path)
  }
  render () {
    const { email, pass, phone } = this.props
    let phoneValue = (phone === 'null' || phone === null) ? '' : phone
    const { validPhone } = this.state
    return (
      <div className='sign-up'>
        <div style={{backgroundImage: `url(/media/wave.svg), linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)`}} className='bottom_bgr'>
          <div className='logo-animation'>
            <img className='sign-up-logo' src={_config.urls.static + 'logo.svg'} />
            <img className='sign-up-logo-name' src={_config.urls.static + 'atzma.im.svg'} />
          </div>
        </div>
        <div className='sign-up-wrap'>
          <div className='title-container'>
            <h1>{_config.translations[_config.data.lang].sign_up.main_title}</h1>
          </div>
          <div className='question-container'>
            <p className='sign-up-question'><span>{_config.translations[_config.data.lang].sign_up.have_acc_alredy}</span><a href={window.location.origin + _config.urls.login} >{_config.translations[_config.data.lang].sign_up.login_in}</a></p>
          </div>
          <form>
            <div className='text-content-wrap'>
              <div className={`group email ${this.state.isValidEmail ? '' : 'err'}`}>
                <img className='group__email'
                  src={_config.urls.static + 'ic_email.svg'} />
                <input type='email'
                  name='email'
                  value={email}
                  ref={email => this.email = email}
                  onChange={() => this.props.onHandleEmailValue(this.email.value)}
                  // if the password and email are empty then we do not do an additional check
                  onBlur={() => { this.checkPassAndEmail() && this.checkEmail() }}
                  className={`group__input ${this.state.isValidEmail ? '' : 'err'}`}
                  placeholder={_config.translations[_config.data.lang].sign_in.enter_email}
                  autoComplete='username' />
              </div>
              <div className={`group password ${this.state.isValidPass ? '' : 'err'}`}>
                <img className='group__lock'
                  src={_config.urls.static + 'ic_pass.svg'} />
                <input type='password'
                  name='pass'
                  value={pass}
                  onChange={() => this.props.onHandlePassValue(this.pass.value)}
                  // if the password and email are empty then we do not do an additional check
                  onBlur={() => { this.checkPassAndEmail() && this.checkPassword() }}
                  ref={pass => this.pass = pass}
                  className={`group__input password ${this.state.isValidPass ? '' : 'err'}`}
                  data-type='password'
                  placeholder={_config.translations[_config.data.lang].sign_in.enter_password}
                  autoComplete='new-password' />
                {this.props.pass && <img className='group__eye'
                  onClick={this.togglePass}
                  src={_config.urls.static + (this.state.isVisiblePass ? 'eye-off.svg' : 'eye.svg')} />}
              </div>
              <div className={'group' + (validPhone ? '' : ' err_phone')}>
                <img className='phone_img' src={_config.urls.static + 'ic_phone.svg'} />
                <input
                  type='tel'
                  name='phone'
                  value={phoneValue}
                  className='group__input input_phone'
                  onChange={this.handleChangePhone}
                  placeholder={_config.translations[_config.data.lang].sign_in.enter_phone}
                />
              </div>
              <div className='login-err'>
                {this.state.errMessage && <img className='login-err__img' src={_config.urls.static + 'vector.svg'} />}
                <span className='login-err__text'>{this.state.errMessage}</span>
              </div>
              <div id='g-recaptcha-response' name='g-recaptcha-response' className='g-recaptcha' data-size='invisible' data-sitekey={_config.recaptcha_v2} />
            </div>
            <button className='login-form__button login-button' type='button' onClick={this.handleGoToBusinessType}>
              {_config.translations[_config.data.lang].sign_up.continue}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
