import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home/home.jsx'
import './style.less'

document.body.onload = function () {
  const body = document.getElementsByTagName('body')[0]
  if (_config.data.isRTL) body.style.direction = 'rtl'
  ReactDOM.render(<Home />, document.getElementById('root'))
}
