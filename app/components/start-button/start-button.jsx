import React from 'react'
import './start-button.less'

const StartButton = ({route, active}) => {
  return (
    <footer className='start-button'>&nbsp;
      <button className={`all-set-form__button start ${active ? 'active' : ''}`} onClick={()=>route()} disabled={!active}>
        <span className='start-button__all-set'>{_config.translations[_config.lang].all_set.lets_start}</span>
      </button>
    </footer>
  )
}

export default StartButton
