import React, {Component} from 'react'
import {apiServices} from 'services'
import './sign-up.less'

class SignUp extends Component {
  render () {
    return (
      <div style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}login-bg.jpg#blur)`}} className='sign-in'>
        <div className='sign-in-wrap'>
          <form ref={form => this.form = form} action={_config.urls.check_login} method='POST'>
          <img className='login-form__img' src={_config.urls.static + 'sing-up-img.png'} />
            <div className='login-form__text'>{_config.translations.sign_up.we_all_set}</div>
            <span className='login-form__forgot'>
              {_config.translations.sign_up.enjoy_your_choice}
            </span>
            <span className='login-form__forgot'>
              {_config.translations.sign_up.you_can_continue}
            </span>
          </form>
          <div className='block-with-checkbox'>
          <div className='checkbox-wrap' ref={checkboxWrapFirst => this.checkboxWrapFirst = checkboxWrapFirst} onClick={()=>{this.checkboxWrapFirst.classList.toggle('opacity'); this.firstCheckbox.click()}}>
            <input id="first" type="checkbox" ref={firstCheckbox => this.firstCheckbox = firstCheckbox} onChange={()=>{this.checkboxWrapFirst.classList.toggle('opacity')}} />
            <label for="first">
              <span></span>
            </label>
              <span className='checkbox-wrap__text'>
                {_config.translations.sign_up.send_important_information}
              </span>
          </div>
          <div className='checkbox-wrap' ref={checkboxWrapTwice => this.checkboxWrapTwice = checkboxWrapTwice} onClick={()=>{this.checkboxWrapTwice.classList.toggle('opacity'); this.twiceCheckbox.click()}}>
            <input id="twice" type="checkbox" ref={twiceCheckbox => this.twiceCheckbox = twiceCheckbox} onChange={()=>{this.checkboxWrapTwice.classList.toggle('opacity')}} />
            <label for="twice">
              <span></span>
            </label>
              <span className='checkbox-wrap__text'>
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
