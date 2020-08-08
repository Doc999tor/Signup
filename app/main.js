import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import './style.less'

document.body.onload = function () {
  if (_config.data.isRTL) document.body.setAttribute('dir', 'rtl')
  ReactDOM.render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
    document.getElementById('root'))
}
