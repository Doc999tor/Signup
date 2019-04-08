import React from 'react'
import ReactDOM from 'react-dom'
import SignUp from './pages/sign-up/sign-up.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './style.less'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path={_config.routing.sign_in_path} component={SignUp} />
      <Route path='*' component={SignUp} />
    </Switch>
  </Router>, document.getElementById('root'))
