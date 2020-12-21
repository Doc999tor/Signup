import React from 'react'
import './start-button.less'

const StartButton = ({route, active, isStartLoad, onMakeChoose, makeChoose}) => {
  const nextStep = () => {
    if (!isStartLoad) {
      route()
    }
  }
  return (
    <footer className='start-button-wrap'>
      <div className='start-button' onClick={!makeChoose && onMakeChoose}>
        <button className={`all-set-form__button start ${active ? 'active' : ''}`} onClick={nextStep} disabled={!active}>
          {isStartLoad
            ? <div className='scaler'><img className='loader' src={`${_config.urls.static}preloader.svg`} /></div>
            : <span className='start-button__all-set'>{_config.translations[_config.data.lang].done_btn}</span>}
        </button>
      </div>
    </footer>
  )
}

export default StartButton
