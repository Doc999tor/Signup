import React from 'react'
import './start-button.less'

const StartButton = ({route, active, isStartLoad, onMakeChoose, makeChoose}) => {
  return (
    <footer className='start-button-wrap'>
      <div className='start-button' onClick={!makeChoose && onMakeChoose}>
        <button className={`all-set-form__button start ${active ? 'active' : ''}`} onClick={()=>{
          if (!isStartLoad) {
            route()
          }
        }} disabled={!active}>
          <span className='start-button__all-set'>{_config.translations[_config.data.lang].done_btn}</span>
          {isStartLoad && <div className={`preloader ${_config.data.isRTL ? 'styleLoaderRTL' : 'styleLoaderLTR'}`}>
            <img className='loader' src={`${_config.urls.static}preloader.svg`} />
          </div>}
        </button>
      </div>
    </footer>
  )
}

export default StartButton
