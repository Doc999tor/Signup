import React, {Component} from 'react'
import {apiServices} from 'services'
import StartButton from '../../components/start-button/start-button.jsx'
import './business-type.less'

class BusinessType extends Component {
  state = {
    isFirstCheckboxChecked: false,
    isTwiceCheckboxChecked: false,
    businessList: [],
    activeItems: []
  }
  componentDidMount () {
    apiServices.get(_config.urls.business_types_get.replace('{lang}', _config.lang)).then(response => {
      if (response && response.length) {
        this.setState({businessList: response})
      }
    })
  }
  render () {
    // console.log(this.state.businessList)
    return (
      <div className='business-type'style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}bg-img.jpg#blur)`}} >
        <div className='top-menu-wrap'>
          <div className='topnav'>
            {/* <div className='topnav-arrow'></div> */}
            <div className='text-wrap'>
              <div className='text-container'>
                <div className='text-container__title'>
                  {/* <img className='images-wrap__back' src={_config.urls.static + 'ic_back.svg'} /> */}
                  Please select business type
                </div>
                <div className='text-container__text'>We’ll adjuas the app to your needs</div>
              </div>
            </div>
            {!this.state.activeItems.length && <div className='choose-menu'>
              <div className='choose-menu__text'>You can choose more the one or</div>
              <button className='choose-menu__button'>skip here</button>
            </div>}
            {!!this.state.activeItems.length && <div className='add-menu'>
            <div className='add-menu__text'>Your choose:</div>
              <div className='add-menu__list'>
                {
                this.state.businessList.map((el, key) => {
                  return (
                    <div key={key} className='selected-business'><div className='checkmark'></div>
                      <span>{el.name}</span>
                    </div>
                  )
                })
                }
              </div>
            </div>
            }
          </div>
          <div className='bussiness-container'>
            {
              this.state.businessList.map((el, key) => {
                let isActive = this.state.activeItems.includes(el.id)
                return (<div className={(isActive && 'bussiness-type active ' || 'bussiness-type')} key={key} onClick={(e) => {
                  let isActive = this.state.activeItems.includes(el.id)
                  if (isActive) {
                    this.setState({
                      activeItems: [...this.state.activeItems].filter((item) => (item !== el.id))
                    })
                  } else {
                    this.setState({
                      activeItems: [...this.state.activeItems, el.id]
                    })
                  }
                }}>
                  <img className='bussiness-type__img' src={_config.urls.business_types_icons + (!isActive ? el.icon : el.icon)} />
                  <div className='bussiness-type__name'>{el.name}</div>
                  <div className='bussiness-type__checkmark'>
                    <div className='checkmark'></div>
                  </div>
                </div>)
              })
            }
          </div>
        </div>
        <StartButton />
      </div>
    )
  }
}

export default BusinessType
