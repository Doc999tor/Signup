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
      // check valid email
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // mail not valid (if not: @, .com or there are prohibited characters)
      if (!re.test(this.props.email)) {
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

  render () {
    return (
      <div style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}bg-img.jpg#blur)`}} className='sign-up'>
        <ul className='nav-lang'>
          <li className='drop'>{_config.data.lang}
            <ul>
              {
                  _config.data.all_langs.map((el, key) => {
                    if (el !== _config.data.lang) {
                      return (
                        <li key={key} onClick={()=>{
                          if (el === 'he') {
                            _config.data.isRTL = true
                            document.body.dir = 'rtl'
                          } else {
                            _config.data.isRTL = false
                            document.body.dir = 'ltr'
                          }
                          _config.data.lang = el
                          this.forceUpdate()
                        }}>{el}</li>
                      )
                    }
                  })
                }
            </ul>
          </li>
        </ul>
        <div className='sign-up-wrap'>
          <img className='sign-up-htm__logo' src={_config.urls.static + 'logo.svg'} />
          <form onSubmit={e => {
            e.preventDefault()
          }} ref={form => this.form = form} action={_config.urls.business_type} method='POST'>
            <div className='text-content-wrap'>
              <div className='login-form__text'>{_config.translations[_config.data.lang].sign_up.fill_dateils_create}</div>
              <button className='login-form__button google dispay-none'>
                {/* <img className='login-form__img' src={_config.urls.static + 'search.svg'} /> */}
                <span>{_config.translations[_config.data.lang].sign_in.login_google}</span>
              </button>
              <input className='login-form__time-zone'
                type='text'
                name='time_zone'
                defaultValue={Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone} />
              <span className='login-form__text or dispay-none' >{_config.translations[_config.data.lang].sign_in.login_or}</span>
              <div className={`group email ${this.state.isValidEmail ? '' : 'err'}`}>
                <img className='group__email'
                  src={_config.urls.static + (this.state.isValidEmail ? 'mail.svg' : 'mail-err.svg')} />
                <input type='email'
                  name='email'
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
                  src={_config.urls.static + (this.state.isValidPass ? 'lock.svg' : 'lock-err.svg')} />
                <input type='password'
                  name='pass'
                  onChange={() => this.props.onHandlePassValue(this.pass.value)}
                  // if the password and email are empty then we do not do an additional check
                  onBlur={() => { this.checkPassAndEmail() && this.checkPassword() }}
                  ref={pass => this.pass = pass}
                  className={`group__input password ${this.state.isValidPass ? '' : 'err'}`}
                  data-type='password'
                  placeholder={_config.translations[_config.data.lang].sign_in.enter_password}
                  autoComplete='current-password' />
                {this.props.pass && <img className='group__eye'
                  onClick={this.togglePass}
                  src={_config.urls.static + (this.state.isVisiblePass ? 'eye-off.svg' : 'eye.svg')} />}
              </div>
              <div className='login-err'>
                {this.state.errMessage && <img className='login-err__img' src={_config.urls.static + 'vector.svg'} />}
                <span className='login-err__text'>{this.state.errMessage}</span>
              </div>
              <div id='g-recaptcha-response' name='g-recaptcha-response' className='g-recaptcha' data-size='invisible' data-sitekey={_config.recaptcha_v2} />
            </div>
            <button className='login-form__button login-button'
              type={this.state.isValidEmail && this.state.isValidPass ? 'submit' : 'button'}
              onClick={e => {
                e.preventDefault()
                this.checkPassword() && this.checkEmail() && this.checkPassAndEmail() && this.props.history.push(window.REACT_ROUTER_BASENAME + _config.routing.business_type_path)
                // this.form.submit()
                // grecaptcha.ready(() => {
                //   grecaptcha.execute(_config.recaptcha_v3, {action: 'homepage'}).then(token => {
                //     apiServices.post('http://localhost/recaptcha/index.php?token={token}'.replace('{token}', token)).then(response => {
                //       console.log('recaptcha', response)
                //       if (!response.success) {
                //         grecaptcha.execute()
                //       } else {
                //         this.form.submit()
                //       }
                //     })
                //   })
                // })
              }}>
              {_config.translations[_config.data.lang].sign_up.continue}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
