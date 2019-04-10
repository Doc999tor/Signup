import React, {Component} from 'react'
import './all-set.less'

class AllSet extends Component {
  state = {
    isFirstCheckboxChecked: false,
    isTwiceCheckboxChecked: false
  }
  render () {
    return (
      <div style={{backgroundImage: `linear-gradient( rgba(79, 45, 167, 0.7) 100%, rgba(93, 54, 177, 0.7)100%), url(${_config.urls.static}bg-img.jpg#blur)`}} className='all-set'>
        <div className='all-set-wrap'>
          <form ref={form => this.form = form} action={_config.urls.check_login} method='POST'>
          <div className='images-wrap'> 
            <img className='images-wrap__back' src={_config.urls.static + 'ic_back.svg'} />        
            <img className='images-wrap__background' src={_config.urls.static + 'sing-up-img.png'} />
          </div>
          <div className='all-set-form__text'>{_config.translations.all_set.we_all_set}</div>
            <span className='all-set-form__forgot'>
              {_config.translations.all_set.enjoy_your_choice}
            </span>
            <span className='all-set-form__forgot'>
              {_config.translations.all_set.you_can_continue}
            </span>
          </form>
          <div className='block-with-checkbox'>
          <div className={`checkbox-wrap ${this.state.isFirstCheckboxChecked ? 'opacity' : ''}`} 
            onClick={()=> this.setState({isFirstCheckboxChecked: !this.state.isFirstCheckboxChecked})}>
            <input id="first" type="checkbox" 
             checked={this.state.isFirstCheckboxChecked}/>
            <label for="first" onClick={()=> {this.setState({isFirstCheckboxChecked: !this.state.isFirstCheckboxChecked}); debugger}}>
              <span onClick={(e)=>e.preventDefault()}></span>
            </label>
              <span className='checkbox-wrap__text'>
                {_config.translations.all_set.send_important_information}
              </span>
          </div>
          <div className={`checkbox-wrap ${this.state.isTwiceCheckboxChecked ? 'opacity' : ''}`} 
          onClick={()=> this.setState({isTwiceCheckboxChecked: !this.state.isTwiceCheckboxChecked})}>
            <input id="twice" type="checkbox" 
            checked={this.state.isTwiceCheckboxChecked} />
            <label for="twice">
              <span onClick={(e)=>e.preventDefault()}></span>
            </label>
              <span className='checkbox-wrap__text'>
                {_config.translations.all_set.agree_to_all_the_Terms}
              </span>
              </div>
              </div>
              {/* {console.log(this.firstCheckbox)} */}
          <footer className='start-button'>&nbsp;
            <button className={`all-set-form__button start ${this.state.isFirstCheckboxChecked && this.state.isTwiceCheckboxChecked ? 'active' : ''}`}>
              <span className='start-button__all-set'>{_config.translations.all_set.lets_start}</span>
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default AllSet
