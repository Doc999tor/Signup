import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { get } from '../../services/apiServices'
import Modal from './components/modal/modal'
import StartButton from '../../components/start-button/start-button'
import './business-type.less'

class BusinessType extends Component {
  state = {
    businessList: [],
    isModalOpen: false
  }

  componentDidMount() {
    get(_config.urls.business_types_get.replace('{lang}', _config.data.lang)).then(response => {
      if (response && response.length) {
        this.setState({ businessList: response })
      }
    })
  }

  handleSkip = () => {
    this.props.history.push({
      pathname: _config.baseUrl + _config.routing.all_set_path,
      search: window.location.search
    })
  }

  handleGoToAllSet = () => {
    if (this.props.selectedBusinessIds.length) {
      this.props.history.push({
        pathname: _config.baseUrl + _config.routing.all_set_path,
        search: window.location.search
      })
    }
  }

  backButton = () => this.props.history.goBack()

  render() {
    return (
      <div className='business-type' >
        <div className='top-menu-wrap'>
          <div className='topnav'>
            <div className='text-wrap'>
              <div className='text-container'>
                <h2 className='text-container__title'>
                  {_config.translations[_config.data.lang].business_type.title}
                </h2>
                <p className='text-container__text'>{_config.translations[_config.data.lang].business_type.subtitle}</p>
              </div>
            </div>
            <div className='buttons-wrap'>
              <img onClick={this.backButton} className='images-wrap__back' src={_config.urls.static + 'ic_back.svg'} />
              <button className='choose-menu__button' onClick={this.handleSkip}>{_config.translations[_config.data.lang].business_type.skip_here}</button>
            </div>
          </div>
            <div className='bussiness-container'>
              {
                this.state.businessList.map((el, key) => {
                  // console.log(el)
                  let isActive = this.props.selectedBusinessIds.includes(el.id)
                  return (<div className={(isActive && 'bussiness-type active ' || 'bussiness-type')}
                    key={key} onClick={() => {
                      if (!isActive && el.id === _config.other_business_type_id) {
                        this.setState({isModalOpen: !this.state.isModalOpen}, () => { this.input.focus() })
                      } else {
                        this.props.onHandleBusinessIds(el.id)
                      }
                    }}>
                    <div className='bussiness-type__info'>
                      <img className={'bussiness-type__img' + ((isActive ? ' active_img' : ' inactive_img'))} src={_config.urls.business_types_icons + (isActive ? el.icon : `violet-${el.icon}`)} />
                      <div className='bussiness-type__name'>{el.name}</div>
                    </div>
                    {isActive && <div className='bussiness-type__checkmark'>
                      <div className='checkmark' />
                    </div>}
                  </div>)
                })
              }
            </div>
          <Modal onClose={() => this.setState({isModal: false})} isActive={this.state.isModalOpen} modalInput={this.modalInput}>
            <div className='top-container'>
              <div className='modal__title'>
                <span>{_config.translations[_config.data.lang].business_type.enter_different_type}</span>
              </div>
              <div className='subject-textarea'>
                <input type='text' className='subject-textarea-wrap__text' ref={input => this.input = input} value={this.props.anotherBusinessType} placeholder={_config.translations[_config.data.lang].business_type.type_business_name}
                  onChange={e => {
                    this.props.onHandleBusinessType(e.target.value)
                  }} />
              </div>
            </div>
            <div className='button-wrap'>
              <div className='modal-buttons'>
                <button className='button-wrap__button' onClick={() => { this.setState({isModalOpen: false}); this.props.onHandleBusinessIds(_config.other_business_type_id) }} disabled={!this.props.anotherBusinessType}>{_config.translations[_config.data.lang].business_type.ok} </button>
              </div>
              <div className='modal-buttons'>
                <button className='button-wrap__button' onClick={() => { this.setState({isModalOpen: false}); this.props.onHandleBusinessType('') }}>{_config.translations[_config.data.lang].business_type.no_thanks} </button>
              </div>
            </div>
          </Modal>
        </div>
        <StartButton route={this.handleGoToAllSet} active={this.props.selectedBusinessIds.length} />
      </div>
    )
  }
}

export default withRouter(BusinessType)
