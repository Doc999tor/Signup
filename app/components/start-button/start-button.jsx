import React from 'react'
import './start-button.less'

const StartButton = ({active}) => {
  return (
    <footer className='start-button'>&nbsp;
      <button className={`all-set-form__button start ${active ? 'active' : ''}`}>
        <span className='start-button__all-set'>{_config.translations.all_set.lets_start}</span>
      </button>
    </footer>
  )
}

export default StartButton
