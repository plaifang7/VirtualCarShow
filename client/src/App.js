import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import { saveAuthTokens, userIsLoggedIn, setAxiosDefaults, clearAuthTokens } from './utils/SessionHeaderUtils'
import CarsList from './components/CarsList'
import CarProf from './components/CarProf'
import { Menu, Button, Icon } from 'semantic-ui-react'
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
  margin: 0 auto;
}
.signOut:hover{
  cursor: pointer;
  background-color: yellow;
}
`


class App extends Component {
  state = {
    signedIn: false,
    cars: [],
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
    const { activeItem } = this.state

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
            <Menu stackable icon='labeled' className="nav">
              <Menu.Item name='home' active={activeItem === 'home'}  onClick={this.handleItemClick}>
              <Link to="/">
              <Icon name='home'/>
              <br/>
              VCS
              </Link>
              </Menu.Item>
              <Menu.Item name='car' active={activeItem === 'car'}  onClick={this.handleItemClick}>
              <Link to="/cars"> 
              <Icon name='car'/>
              <br/>
                Cars
                </Link>
              </Menu.Item>
              <Menu.Menu position='right'>
              <Menu.Item name='login' active={activeItem === 'login'}  onClick={this.handleItemClick}>
                <Link to="/signUp">
                <Icon name='sign in'/>
                <br/>
                Login/ Sign Up
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Button className="signOut" onClick={this.signOut}>Sign Out</Button>
              </Menu.Item>
              </Menu.Menu>
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
