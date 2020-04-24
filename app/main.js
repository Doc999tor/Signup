import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import './style.less'

document.body.onload = function () {
  const body = document.getElementsByTagName('body')[0]
  if (_config.data.isRTL) body.style.direction = 'rtl'
  ReactDOM.render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
    document.getElementById('root'))
}
