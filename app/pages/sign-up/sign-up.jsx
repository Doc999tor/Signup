import React, { Component } from 'react'
import { post } from '../../services/apiServices'
import { getPrettyDate } from '../../services/helperServices.js'
import { postValidateService } from '../../services/api_services.js'
import SendModal from '../send_modal/index.jsx'

import './sign-up.less'

class SignUp extends Component {
  state = {
    statusOutsideValidation: false,
    incorrectNumber: false,
    name: '',
    phone: '',
    send: false,
    sending: false,
    validName: true,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.statusOutsideValidation && !this.state.statusOutsideValidation && this.state.send && !this.state.icorrectNumber && !prevState.icorrectNumber) {
      this.handlePostRequest()
    }
  }

  handleChangePhone = e => {
    const value = e.target.value
    this.setState({
      phone: value,
      incorrectNumber: false,
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
    if (this.state.phone && !this.state.incorrectNumber) {
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
              incorrectNumber: true,
              send: false
            })
          }
        })
        .catch(error => console.log({ error }))
        .finally(() => this.setState({
          statusOutsideValidation: false,
        }))
    }
  }

  handlePostRequest = () => {
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
      })
        .then(() => {
          this.setState({ sending: false })
          setTimeout(() => {
            this.setState({ send: false })
            window.history.back()
          }, 4000)
        })
        .catch(error => console.log({ error }))
    }, 500)
  }

  sendLead = () => {
    if (this.handleCheckName() && this.handleCheckPhone()) {
      this.setState({ send: true, sending: true }, () => {
        !this.state.statusOutsideValidation && this.handlePostRequest()
      })
    } else {
      !this.state.name && this.setState({ validName: false })
      !this.state.phone?.trim() && this.setState({ incorrectNumber : true })
    }
  }

  render() {
    const { incorrectNumber, sending, send } = this.state
    return (
      <div className='sign-up'>
        <div className='main-content'>
          <div style={{ backgroundImage: 'linear-gradient(123deg, #591ec0, #6623db 28%, #7d3ee8 54%, #be95ff 113%)' }} className='bottom_bgr'>
            <img className='wave' src={`${_config.urls.static}wave.svg`} alt='wave' />
            <div className='logo-wrap'>
              <a href={_config.urls.home} className='home-link'>
                <img className='sign-up-logo' src={`${_config.urls.static}logo.svg`} alt='' />
                <img className='sign-up-logo-name' src={`${_config.urls.static}atzma.im.svg`} alt='' />
              </a>
            </div>
          </div>
          {send
            ? <SendModal sending={sending} />
            : (
              <div className='sign-up-wrap'>
                <div className='title-container'>
                  <h1>{_config.translations[_config.data.lang].sign_up.main_title}</h1>
                </div>
                <div className='question-container'>
                  <p className='sign-fill_fields'>{_config.translations[_config.data.lang].sign_up.fill_fields_label}</p>
                  <a href={_config.urls.login} className='sign-up-question'><span>{_config.translations[_config.data.lang].sign_up.have_acc_alredy}</span><span className='login_label'>{_config.translations[_config.data.lang].sign_up.login_in}</span></a>
                </div>
                <form>
                  <div className='text-content-wrap'>
                    <div className={`group${this.state.validName ? '' : ' err'}`}>
                      <img className='phone_img' src={`${_config.urls.static}ic_name.svg`} alt='' />
                      <input
                        type='text'
                        name='name'
                        value={this.state.name}
                        className='group__input input_name'
                        onChange={this.handleChangeName}
                        placeholder={_config.translations[_config.data.lang].sign_in.enter_name}
                      />
                    </div>
                    <div className={`group${!incorrectNumber ? '' : ' err_phone'}`}>
                      <img className='phone_img' src={`${_config.urls.static}ic_phone.svg`} alt='' />
                      <input
                        type='tel'
                        name='phone'
                        value={this.state.phone}
                        className='group__input input_phone'
                        onChange={this.handleChangePhone}
                        onBlur={this.handleBlurPhone}
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
        <div className='messengers_strip'>
          <h3>{_config.translations[_config.data.lang].sign_up.messengers_strip_lebel}</h3>
          <div className='messengers_wrap'>
            {_config.messengers.data.map(({ name, url, icon }) => (
              <a className='item' href={url}>
                <span className='icon_wrap'><img className='icon' src={_config.urls.static + icon} alt='' /></span>
                <span className='name'>{_config.translations[_config.data.lang].sign_up.messengers[name]}</span>
              </a>
            ))}
          </div>
        </div>
        <div className='call_now'>
          <p>{_config.translations[_config.data.lang].sign_up.call_now}</p>
          <a href={`tel:${_config.data.phone}`}>{_config.data.phone}</a>
        </div>
      </div>
    )
  }
}

export default SignUp
