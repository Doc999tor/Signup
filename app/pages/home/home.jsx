import React from 'react'
import AllSet from '../all-set/all-set.jsx'
import SignUp from '../sign-up/sign-up.jsx'
import BusinessType from '../business-type/business-type.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class Home extends React.Component {
  state = {
    email: '',
    pass: '',
    selectedBusinessIds: [],
    anotherBusinessType: ''
  }
  handleEmailValue = (e) => {
    this.setState({email: e})
  }
  handlePassValue = (e) => {
    this.setState({pass: e})
  }
  handleBusinessIds = (id) => {
    if (this.state.selectedBusinessIds.includes(id)) {
      this.setState({
        selectedBusinessIds: [...this.state.selectedBusinessIds].filter((item) => (item !== id))
      })
    } else {
      this.setState({
        selectedBusinessIds: [...this.state.selectedBusinessIds, id]
      })
    }
  }
  handleBusinessType = val => {
    this.setState({anotherBusinessType: val})
  }
  render () {
    return (
      <div id='home'>
        <Router>  
          <Switch>
            <Route exact path={_config.routing.sign_up_path} render={() => <SignUp {...this.state} onHandlePassValue={pass => this.handlePassValue(pass)} onHandleEmailValue={email => this.handleEmailValue(email)} />} />
            <Route exact path={_config.routing.business_type_path} render={() => <BusinessType {...this.state} onHandleBusinessIds={this.handleBusinessIds} onHandleBusinessType={this.handleBusinessType} />} />
            <Route exact path={_config.routing.all_set_path} render={() => <AllSet {...this.state} />} />
            <Route path='*' render={() => <SignUp />} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default Home
