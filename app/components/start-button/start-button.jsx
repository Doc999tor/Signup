import React from 'react'
import './start-button.less'

const StartButton = ({route, active, isStartLoad}) => {
  return (
    <footer className='start-button'>&nbsp;
      <button className={`all-set-form__button start ${active ? 'active' : ''}`} onClick={()=>{
        if (!isStartLoad) {
          route()
        }
      }} disabled={!active}>
        <span className='start-button__all-set'>{_config.translations[_config.data.lang].all_set.lets_start}</span>
        {isStartLoad && <div className={`preloader ${_config.data.isRTL ? 'styleLoaderRTL' : 'styleLoaderLTR'}`}>
          <img className='loader' src={`${_config.urls.static}preloader.svg`} />
        </div>}
      </button>
    </footer>
  )
}

export default StartButton
