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
  
  handleEmailValue = (v) => {
    this.setState({email: v})
  }
  handlePassValue = (v) => {
    this.setState({pass: v})
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
            <Route exact path={_config.routing.sign_up_path} render={() => <SignUp {...this.state} onHandlePassValue={this.handlePassValue} onHandleEmailValue={this.handleEmailValue} />} />
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
