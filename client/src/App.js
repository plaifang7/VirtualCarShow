import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import { saveAuthTokens, userIsLoggedIn, setAxiosDefaults, clearAuthTokens } from './utils/SessionHeaderUtils'
import CarsList from './components/CarsList';
import './App.css';


class App extends Component {
  state = {
    signedIn: false,
    cars: []
  }

  async componentDidMount () {
    const signedIn = userIsLoggedIn()
    let cars = []

    if (signedIn) {
      setAxiosDefaults()
      cars = await this.getCars()
    }
    this.setState({ cars, signedIn })
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

      this.setState({ 
        signedIn: true 
      })

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
      const res = await axios.post('/auth/sign_in', payload)
      saveAuthTokens(res.headers)

      const cars = await this.getCars()

      this.setState({ 
        cars, 
        signedIn: true 
      })

    } catch (error) {
      console.log(error)
    }
  }

  signOut = async(event) => {
    event.preventDefault()

    await axios.delete('auth/sign_out')
    clearAuthTokens()

    this.setState({signedIn: false})
  }


  render() {
    const SignUpLogInComponent = () => (
      <SignUpLogIn
        signUp={this.signUp}
        signIn={this.signIn} />
    )

    const CarslistComponent = () => (
      <CarsList 
      cars={this.state.cars}
      />
    )
      

    return (
      <Router>
        <div>
          <div>
            <Link to ="/">VCS</Link>
            <Link to="/signUp">Login</Link>
            <Link to="/signUp">Sign Up</Link>
            <button onClick={this.signOut}>Sign Out</button>
          </div>
          <Switch>
            <Route exact path="/signUp" render={SignUpLogInComponent} />
            <Route exact pathe="/cars" render={CarslistComponent} />
          </Switch>

          {this.state.signedIn ? 
            <Redirect to="/cars" /> : 
            <Redirect to="/signUp" />}
        </div>
      </Router>
    );
  }
}

export default App;
