import React, { Component } from 'react'
import { post } from '../../services/apiServices'
import { getPrettyDate } from '../../services/helperServices.js'
import SendModal from '../send_modal/index.jsx'

import './sign-up.less'

class SignUp extends Component {
  state = {
    name: '',
    phone: '',
    send: false,
    sending: false,
    validPhone: true,
    validName: true,
  }

  handleChangePhone = e => {
    const value = e.target.value
    const reg = /(^[0-9-+]+$)/
    this.setState({
      phone: value,
      validPhone: value ? reg.test(value.trim()) : true
    })
  }

  handleChangeName = e => {
    const value = e.target.value
    this.setState({
      validName: true,
      name: value
    })
  }

  handleCheckName = () => {
    if (this.state.name) {
      return true
    }
    return false
  }

  handleCheckPhone = () => {
    if (this.state.phone && this.state.validPhone) {
      return true
    }
    return false
  }

  handlePostRequest = () => {
    this.setState({ send: true, sending: true });
    setTimeout(() => {
      const body = {
        name: this.state.name.trim(),
        contact_detail: this.state.phone.trim(),
        added: getPrettyDate()
      }
      post(_config.urls.api_leads + location.search, {
        params: body,
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(() => {
        this.setState({ sending: false })
        setTimeout(() => {
          this.setState({ send: false })
          window.history.back()
        }, 4000)
      })
    }, 1000)
  }

  sendLead = () => {
    if (this.handleCheckName() && this.handleCheckPhone()) {
      this.handlePostRequest()
    } else {
      const reg = /(^[0-9-+]+$)/
      !this.state.name && this.setState({ validName: false })
      !reg.test(this.state.phone) && this.setState({ validPhone: false })
    }
  }

  render() {
    const { validPhone, sending, send } = this.state
    return (
      <div className='sign-up'>
        <div className='main-content'>
          <div style={{ backgroundImage: 'linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)' }} className='bottom_bgr'>
            <img className='wave' src={`${_config.urls.static}wave.svg`} alt='wave' />
            <div className='logo-wrap'>
              <a href={_config.urls.home} className='home-link'>
                <img className='golden_numbers' src={`${_config.urls.static}golden numbers@2x.png`} />
                <img className='gift_box' src={`${_config.urls.static}gift box.svg`} />
                <div className='gift_labels'>
                  <p className='title'>{_config.translations[_config.data.lang].sign_up?.gift_labels?.title}</p>
                  <p className='subtitle'>{_config.translations[_config.data.lang].sign_up?.gift_labels?.subtitle}</p>
                </div>
              </a>
            </div>
          </div>
          {send
            ? <SendModal sending={sending} />
            : (
              <div className='sign-up-wrap'>
                <a href={_config.urls.home} className='lista-link'>
                  <img className='logotype' src={`${_config.urls.static}logotype.svg`} />
                </a>
                <div className='title-container'>
                  <h1>{_config.translations[_config.data.lang].sign_up.main_title}</h1>
                </div>
                <div className='question-container'>
                  <p className='sign-fill_fields'>{_config.translations[_config.data.lang].sign_up.fill_fields_label}</p>
                  <a href={window.location.origin + _config.urls.login} className='sign-up-question'><span>{_config.translations[_config.data.lang].sign_up.have_acc_alredy}</span><span className='login_label'>{_config.translations[_config.data.lang].sign_up.login_in}</span></a>
                </div>
                <form>
                  <div className='text-content-wrap'>
                    <div className={`group${this.state.validName ? '' : ' err'}`}>
                      <img className='phone_img' src={`${_config.urls.static}ic_name.svg`} />
                      <input
                        type='text'
                        name='name'
                        value={this.state.name}
                        className='group__input input_name'
                        onChange={this.handleChangeName}
                        placeholder={_config.translations[_config.data.lang].sign_in.enter_name}
                      />
                    </div>
                    <div className={`group${validPhone ? '' : ' err_phone'}`}>
                      <img className='phone_img' src={`${_config.urls.static}ic_phone.svg`} />
                      <input
                        type='tel'
                        name='phone'
                        value={this.state.phone}
                        className='group__input input_phone'
                        onChange={this.handleChangePhone}
                        placeholder={_config.translations[_config.data.lang].sign_in.enter_phone}
                      />
                    </div>
                  </div>
                  <button className='login-form__button login-button' type='button' onClick={this.sendLead}>
                    {_config.translations[_config.data.lang].sign_up.send}
                  </button>
                </form>
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default SignUp
