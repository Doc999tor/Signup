import React from 'react'
import AllSet from '../all-set/all-set.jsx'
import SignUp from '../sign-up/sign-up.jsx'
import BusinessType from '../business-type/business-type.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class Home extends React.Component {
  state = {
    email: '',
    pass: '',
    selectedBusinessIds: []
    // permitAds: 'true&',
    // lang: 'config.lang &',
    // timezone: 'ответ из /countries запроса',
    // country: 'ответ из /countries запроса',
    // city: 'ответ из /countries запроса',
    // added: '2019-01-01 // local time',
    // another_business_type: 'сантехник' 
  }
  handleEmailValue = (e) => {
    this.setState({email: e.target.value})
  }
  handlePassValue = (e) => {
    this.setState({pass: e.target.value})
  }
  handleBusinessIds = (el) => {
    if (this.state.selectedBusinessIds.includes(el.id)) {
      this.setState({
        selectedBusinessIds: [...this.state.selectedBusinessIds].filter((item) => (item !== el.id))
      })
    } else {
      this.setState({
        selectedBusinessIds: [...this.state.selectedBusinessIds, el.id]
      })
    }
  }

  render () {
    return (
      <div id='home'>
        <Router>
          <Switch>
            <Route exact path={_config.routing.sign_up_path} render={() => <SignUp {...this.state} onHandlePassValue={this.handlePassValue} onHandleEmailValue={this.handleEmailValue} />} />
            <Route exact path={_config.routing.business_type_path} render={() => <BusinessType {...this.state} onHandleBusinessIds={this.handleBusinessIds}/>} />
            <Route exact path={_config.routing.all_set_path} render={() => <AllSet {...this.state} />} />
            <Route path='*' render={() => <SignUp />} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Home
