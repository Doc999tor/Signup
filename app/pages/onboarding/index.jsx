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
  const lastPage = _config.onboarding_pages[_config.onboarding_pages.length - 1]
  return (
    <div className={`onboarding_page ${name}`}>
      <div className='icon-wrap'>
        <img src={_config.urls.static + icon} alt={icon} />
      </div>
      <h2>{text}</h2>
      <div className='progress'>
        {_config.onboarding_pages.map(item => <div key={item.name} className={'progress_item' + (item.name === name ? ' progress_active' : '')} />)}
      </div>
      <button onClick={nextStep} className={'next-step' + (lastPage.name === name ? ' lets-start' : '')} type='button'>{lastPage.name === name ? _config.translations[_config.data.lang].onboarding.lets_start : <img src={_config.urls.static + 'ic_back.svg'} />}</button>
    </div>
  )
}
export default withRouter(Onboarding)
