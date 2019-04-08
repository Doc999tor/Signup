import React, {Component} from 'react'
import {apiServices} from 'services'
import './sign-up.less'

class SignUp extends Component {
  render () {
    return (
      <div style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}login-bg.jpg#blur)`}} className='sign-in'>
        <div className='sign-in-wrap'>
          <form ref={form => this.form = form} action={_config.urls.check_login} method='POST'>
            <div className='login-form__text'>{_config.translations.sign_up.we_all_set}</div>

            <input className='login-form__time-zone'
              type='text'
              name='time_zone'
              defaultValue={Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone} />
            {/* <input type='hidden' id='g-recaptcha-response' name='g-recaptcha-response' /> */}
            {/* <span className='login-form__text or dispay-none' > */}
              {/* {_config.translations.sign_in.login_or} */}
            {/* </span> */}
            {/* <div className={`group email ${'' ? '' : 'err'}`}>
              <img className='group__email'
                src={_config.urls.static + ('' ? 'mail.svg' : 'mail-err.svg')} />
              <input type='email'
                name='email'
                ref={email => this.email = email}
                onChange={e => this.setState({emailValue: e.target.value})}
                // if the password and email are empty then we do not do an additional check
                onBlur={() => { this.checkPassAndEmail() && this.checkEmail() }}
                className='group__input email'
                placeholder={_config.translations.sign_in.enter_email}
                autoComplete='username' />
            </div> */}
            {/* <div className={`group password ${'' ? '' : 'err'}`}>
              <img className='group__lock'
                src={_config.urls.static + ('' ? 'lock.svg' : 'lock-err.svg')} />
              <input type='password'
                name='pass'
                onChange={e => this.setState({passValue: e.target.value})}
                // if the password and email are empty then we do not do an additional check
                onBlur={() => { this.checkPassAndEmail() && this.checkPassword() }}
                ref={pass => this.pass = pass}
                className='group__input password'
                data-type='password'
                placeholder={_config.translations.sign_in.enter_password}
                autoComplete='current-password' />
              {'' && <img className='group__eye'
                onClick={this.togglePass}
                src={_config.urls.static + ('' ? 'eye-off.svg' : 'eye.svg')} />}
            </div> */}
            {/* <div className='login-err'>
              {'' && <img className='login-err__img' src={_config.urls.static + 'vector.svg'} />}
              <span className='login-err__text'>{''}</span>
            </div> */}
            {/* <button className='login-form__button login-button'
              type={'' && '' ? 'submit' : 'button'}
              onClick={e => {
                e.preventDefault()
                grecaptcha.ready(() => {
                  grecaptcha.execute('6LcXaJsUAAAAABggIFrA5GbeAX0T7RgnK6tohhqn', {action: 'homepage'}).then(token => {
                    apiServices.post(_config.urls.recaptcha_post.replace('{token}', token)).then(response => {
                      console.log(response)
                      this.checkPassword() && this.checkEmail() && this.checkPassAndEmail() && this.form.submit()
                    })
                  })
                })
              }}>
              {_config.translations.sign_in.login}
            </button> */}
            <span className='login-form__forgot' onClick={() => this.props.history.push(_config.routing.forgot_path)}>
              {_config.translations.sign_up.enjoy_your_choice}
            </span>
            <span className='login-form__forgot' onClick={() => this.props.history.push(_config.routing.forgot_path)}>
              {_config.translations.sign_up.you_can_continue}
            </span>
          </form>
          
          <div className='block-with-checkbox' onClick={() => this.props.history.push(_config.routing.forgot_path)}>
          <div className='checkbox-wrap' onClick={() => this.props.history.push(_config.routing.forgot_path)}>

            {/* <div> */}
                <input type="checkbox" id="horns" name="horns" />
  <label for="horns"/>
  {/* </div> */}
              <span className='checkbox-wrap__text' onClick={() => this.props.history.push(_config.routing.forgot_path)}>
                {_config.translations.sign_up.send_important_information}
              </span>
          </div>
          <div className='checkbox-wrap' onClick={() => this.props.history.push(_config.routing.forgot_path)}>
            {/* <div> */}
            <input type="checkbox" id="horns" name="horns" />
            <label for="horns"/>
  {/* </div> */}
              <span className='checkbox-wrap__text' onClick={() => this.props.history.push(_config.routing.forgot_path)}>
                {_config.translations.sign_up.agree_to_all_the_Terms}
              </span>
              </div>
              </div>
          <footer className='dont-have-acc'>&nbsp;
            <button className='login-form__button google'>
              <span className='dont-have-acc__sign-up'>{_config.translations.sign_up.lets_start}</span>
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default SignUp
