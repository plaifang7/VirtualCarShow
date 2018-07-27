import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    signedIn: false,
    cars: []
  }

  async componentDidMount () {
    
  }

  getCars = async () => {
    const res = await axios.get('/cars')
    return res.data
  }

  signUp = async (email, password, password_confirmation) => {
    try {
      const payload = {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
      await axios.post('/auth', payload)

      this.setState({ signedIn: true })

    } catch (error) {
      console.log(error)
    }
  }

  signIn = async (email, password) => {
    try {
      const payload = {
        email,
        password
      }
      await axios.post('/auth/sign_in', payload)

      this.setState({ signedIn: true })

    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const SignUpLogInComponent = () => (
      <SignUpLogIn
        signUp={this.signUp}
        signIn={this.signIn} />
    )

    return (
      <Router>
        <div>
          <div>
            <Link to ="/">VCS</Link>
            <Link to="/signUp">Login</Link>
            <Link to="/signUp">Sign Up</Link>
          </div>
          <Switch>
            <Route exact path="/signUp" render={SignUpLogInComponent} />
          </Switch>

          {this.state.signedIn ? null : <Redirect to="/signUp" />}
        </div>
      </Router>
    );
  }
}

export default App;
