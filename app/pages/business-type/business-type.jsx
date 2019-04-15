import React, {Component} from 'react'
import {apiServices} from 'services'
import { withRouter } from 'react-router-dom'
import Modal from './components/modal/modal.jsx'
import StartButton from '../../components/start-button/start-button.jsx'
import './business-type.less'

class BusinessType extends Component {
  state = {
    businessList: [],
    selectedBusinessIds: [],
    isModalOpen: false
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
      <div className='business-type' style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}bg-img.jpg#blur)`}} >
        <div className='top-menu-wrap'>
          <div className='topnav'>
            {/* <div className='topnav-arrow'></div> */}
            <div className='text-wrap'>
              <div className='text-container'>
                <div className='text-container__title'>
                  {/* <img className='images-wrap__back' src={_config.urls.static + 'ic_back.svg'} /> */}
                  {_config.translations[_config.lang].business_type.select_business_type}
                </div>
                <div className='text-container__text'>{_config.translations[_config.lang].business_type.adjuas_the_app}</div>
              </div>
            </div>
            {!this.props.selectedBusinessIds.length && <div className='choose-menu'>
              <div className='choose-menu__text'>{_config.translations[_config.lang].business_type.can_choose_more}</div>
              <button className='choose-menu__button' onClick={()=>{
                this.props.history.push({
                  pathname: _config.routing.all_set_path,
                  search: window.location.search
                })
              }}>{_config.translations[_config.lang].business_type.skip_here}</button>
            </div>}
            {!!this.props.selectedBusinessIds.length && <div className='add-menu'>
            <div className='add-menu__text'>{_config.translations[_config.lang].business_type.your_choose}</div>
              <div className='add-menu__list'>
                {
                  this.state.businessList.map((el, key) => {
                    if (!this.props.selectedBusinessIds.includes(el.id)) return false
                    return (
                      <div key={key} className='selected-business'>
                        <div className='checkmark' />
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
                let isActive = this.props.selectedBusinessIds.includes(el.id)
                return (<div className={(isActive && 'bussiness-type active ' || 'bussiness-type')} 
                  key={key} onClick={() => {
                    if (!isActive && el.id === _config.user_data.other_business_type_id) {
                      this.setState({isModalOpen: !this.state.isModalOpen})
                    } else {
                      this.props.onHandleBusinessIds(el.id)
                    }
                  }}>
                  <img className='bussiness-type__img' src={_config.urls.business_types_icons + (isActive ? el.icon.replace(el.icon, `violet-${el.icon}`) : el.icon)} />
                  <div className='bussiness-type__name'>{el.name}</div>
                  {isActive && <div className='bussiness-type__checkmark'>
                    <div className='checkmark'></div>
                  </div>}
                </div>)
              })
            }
          </div>
          <Modal onClose={() => this.setState({isModal: false})} isActive={this.state.isModalOpen}>
            <div className='top-container'>
              <div className='modal__title'>
                <span>Enter a different type of business</span>
        {/* <img className='modal__title' src={config.urls.static + 'btn-not.svg'} /> */}
      </div>
      <div className='subject-textarea'>
  <input className='subject-textarea-wrap__text' value={this.props.anotherBusinessType} placeholder={_config.translations[_config.lang].business_type.type_business_name}
    onChange={(e) => {
      this.props.onHandleBusinessType(e.target.value)
    }} />
</div>
</div>

        <div className='button-wrap'>
          <div className='modal-buttons'>
            <button className='button-wrap__button' onClick={() => { this.setState({isModalOpen: false}); this.props.onHandleBusinessIds(_config.user_data.other_business_type_id) }} disabled={!this.props.anotherBusinessType}>{'Ok'} </button>
        </div>
        <div className='modal-buttons'>
          <button className='button-wrap__button' onClick={() => { this.setState({isModalOpen: false}); this.props.onHandleBusinessType('') }}>{'No, thanks'} </button>
        </div>
        </div>
      </Modal>
        </div>
        <StartButton route={() => {
          if (this.props.selectedBusinessIds.length) {
            this.props.history.push({
              pathname: _config.routing.all_set_path,
              search: window.location.search
            })
          }
        }} active={this.props.selectedBusinessIds.length}/>
      </div>
    )
  }
}

export default withRouter(BusinessType)
