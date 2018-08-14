import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import { saveAuthTokens, userIsLoggedIn, setAxiosDefaults, clearAuthTokens } from './utils/SessionHeaderUtils'
import CarsList from './components/CarsList'
import CarProf from './components/CarProf'
import { Menu, Button } from 'semantic-ui-react'
import HomePage from './components/HomePage'

const AppWrap = styled.div`
width: 100vw;
height: 100%;
background-color: black;
background-size: cover;
`

const NavBar = styled.div`
a {
  color: yellow;
}
.nav{
  background-color: red;
}
.signOut{
  background-color: black;
  color: yellow;
}
.signOut:hover{
  cursor: pointer;
  background-color: yellow;
}
`


class App extends Component {
  state = {
    signedIn: false,
    cars: []
  }

  async componentDidMount() {
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

  signOut = async (event) => {
    event.preventDefault()

    await axios.delete('auth/sign_out')
    clearAuthTokens()

    this.setState({ signedIn: false })
  }

  deleteCar = async (id) => {
    await axios.delete(`/cars/${id}`)
    const cars = await this.getCars()
    this.setState({ cars })
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
        deleteCar={this.deleteCar}
      />
    )


    return (
      <Router>
        <AppWrap>
          <NavBar>
          <Menu stackable className="nav">
            <Menu.Item>
              <Link to="/">VCS</Link>
              </Menu.Item>
            <Menu.Item>
            <Link to="/signUp">Login</Link>
            </Menu.Item>
            <Menu.Item>
            <Link to="/signUp">Sign Up</Link>
            </Menu.Item>
            <Menu.Item>
            <Button className="signOut" onClick={this.signOut}>Sign Out</Button>
            </Menu.Item>
          </Menu>
          </NavBar>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signUp" render={SignUpLogInComponent} />
            <Route exact path="/cars" render={CarslistComponent} />
            <Route exact path="/cars/:id" component={CarProf} />
          </Switch>

          {this.state.signedIn ?
            <Redirect to="/cars" /> :
            <Redirect to="/" />}
        </AppWrap>
      </Router>
    );
  }
}

export default App;
