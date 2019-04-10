import React from 'react'
import ReactDOM from 'react-dom'
import AllSet from './pages/all-set/all-set.jsx'
import SignUp from './pages/sign-up/sign-up.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './style.less'

ReactDOM.render(
  <Router>
    <Switch>
    <Route exact path={_config.routing.sign_up_path} component={SignUp} />
    <Route exact path={_config.routing.all_set_path} component={AllSet} />
    <Route path='*' component={SignUp} />
    </Switch>
  </Router>, document.getElementById('root'))
