import React from 'react'
import { withRouter } from 'react-router-dom'
import './onboarding.less'

const Onboarding = ({ name, icon, text, nextRoute, history }) => {
  const nextStep = () => {
    history.push({
      pathname: window.REACT_ROUTER_BASENAME + nextRoute,
      search: window.location.search
    })
  }
  return (
    <div className={`onboarding_page ${name}`}>
      <div className='icon-wrap'>
        <img src={_config.urls.static + icon} alt={icon} />
      </div>
      <h2>{text}</h2>
      <button onClick={nextStep} className='next-step' type='button'><img src={_config.urls.static + 'ic_back.svg'} /></button>
    </div>
  )
}
export default withRouter(Onboarding)
