import React from 'react'
import './styles.less'

const ExistingEmail = ({route, active, isStartLoad, onMakeChoose, makeChoose}) => {
  return (
    <a className='existing_email_strip' href={window.location.origin + _config.urls.login}>
      <img src={_config.urls.static + 'ic_alert.svg'} alt='alert' />
      <p className='existing_email_label'>{_config.translations[_config.data.lang].sign_up.existing_email_label}</p>
    </a>
  )
}

export default ExistingEmail