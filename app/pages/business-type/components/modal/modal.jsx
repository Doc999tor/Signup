import React from 'react'
import './modal.less'

const Modal = props => {
  let closeModal = e => {
    let classList = e.target.classList
    if (classList.contains('modal__close') || classList.contains('modal__wrap')) {
      e.preventDefault()
      e.stopPropagation()
      props.onClose(e)
    }
  }

  if (props.isActive) {
    document.querySelector('body').style.overflow = 'hidden'
  } else {
    document.querySelector('body').style.overflow = ''
  }

  return (<div className={`${props.isActive ? 'modal__wrap--active' : 'modal__wrap'}`} onClick={closeModal}>
    <div className='modal'>
      {props.children}
    </div>
  </div>)
}
export default Modal
