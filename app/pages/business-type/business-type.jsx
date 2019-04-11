import React, {Component} from 'react'
import {apiServices} from 'services'
import StartButton from '../../components/start-button/start-button.jsx'
import './business-type.less'

class BusinessType extends Component {
  state = {
    isFirstCheckboxChecked: false,
    isTwiceCheckboxChecked: false,
    businessList: [],
    checkedBusinessList: []
  }
  componentDidMount () {
    apiServices.get(_config.urls.business_types_get.replace('{lang}', _config.lang)).then(response => {
      console.log(response)
      if (response && response.length) this.setState({businessList: response})
    })
  }
  render () {
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
            <div className='choose-menu'>
              <div className='choose-menu__text'>You can choose more the one or</div>
              <button className='choose-menu__button'>skip here</button>
            </div>
          </div>
          <div className='bussiness-container'>
            {
              this.state.businessList.map((el, key) => {
                return (<div className='bussiness-type' key={key} onClick={(e) => {
                  let classList = e.currentTarget.classList
                  let checkedBusinessList = []
                  classList.toggle('active')
                  if (classList.contains('active')) {
                    checkedBusinessList.push(el)
                  } else {
                    checkedBusinessList.slice(1, key)
                  }
                }}>
                  <img className='bussiness-type__img' src={_config.urls.static + el.icon} />
                  <div className='bussiness-type__name'>{el.name}</div>
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
