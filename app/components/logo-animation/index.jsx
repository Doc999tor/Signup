import React, { Component } from 'react'
import './logo-animation.less'

const animation = ['logo', 'crm']

export default class Slideshow extends Component {
  state = {
    current: 0,
    speed: 4800,
  };

  componentDidMount() {
    this.startRotation()
  }

  componentWillUnmount() {
    this.stopRotation()
  }

  startRotation = () => {
    this.interval = setInterval(this.next, this.state.speed)
  }

  stopRotation = () => {
    clearInterval(this.interval)
  }

  next = () => {
    const current = this.state.current
    let nextSlide = current + 1

    if (nextSlide > animation.length - 1) {
      nextSlide = 0
    }

    this.setState({
      current: nextSlide
    })
  }

  render() {
    return (
      <div className='slideshow__container'>
        {this.state.current
          ? <div className='crm-animation'>
              <img src={_config.urls.static + 'ic_calendar.svg'} alt='ic_calendar.svg' />
              <div className='crm-texts'>
                <div className='crm_top'><p>{_config.translations[_config.data.lang].sign_up.logo_animation.top_text}</p></div>
                <div className='crm_bottom'><p>{_config.translations[_config.data.lang].sign_up.logo_animation.bottom_text}</p></div>
              </div>
            </div>
          : <div className='logo-animation'>
              <img className='sign-up-logo' src={_config.urls.static + 'logo.svg'} />
              <img className='sign-up-logo-name' src={_config.urls.static + 'atzma.im.svg'} />
            </div>}
      </div>
    )
  }
}
