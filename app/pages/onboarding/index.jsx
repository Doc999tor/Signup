import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './onboarding.less'

const Onboarding = ({ name, icon, text, nextRoute, finalRedirect, history, isStartLoad }) => {
  const nextStep = () => {
    history.push({
      pathname: _config.baseUrl + nextRoute,
      search: window.location.search
    })
  }
  const letsStart = () => {
    location.href = window.location.origin + finalRedirect
  }
  const lastPage = _config.onboarding_pages[_config.onboarding_pages.length - 1]
  const [loader, runLoader] = useState(false)

  const lastStep = () => isStartLoad ? runLoader(true) : letsStart()

  useEffect(() => {
    if (!isStartLoad && loader && finalRedirect) {
      lastStep()
    }
  }, [isStartLoad, finalRedirect])
  const isLastPage = lastPage.name === name
  return (
    <div className={`onboarding_page ${name}`}>
      <div className='icon-wrap'>
        <img src={_config.urls.static + icon} alt={icon} />
      </div>
      <h2>{text}</h2>
      <div className='progress'>
        {_config.onboarding_pages.map(item => <div key={item.name} className={'progress_item' + (item.name === name ? ' progress_active' : '')} />)}
      </div>
      <button onClick={isLastPage ? lastStep : nextStep} className={'next-step' + (isLastPage ? ' lets-start' : '')} type='button'>
        {
          isLastPage
            ? loader && isStartLoad ? <img className='loader' src={_config.urls.static + 'preloader.svg'} /> : _config.translations[_config.data.lang].onboarding_pages.start_btn_label
            : <img src={_config.urls.static + 'ic_back.svg'} />
        }
      </button>
    </div>
  )
}
export default withRouter(Onboarding)
