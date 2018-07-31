
import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import styled from 'styled-components'

const LoginWrap = styled.div `
width: 50vw;
background-color: red;
margin-top: 50px;
height: 100%;

Form.Field {
  width: 70px;
}

.signIn{

}


`

class SignUpLogIn extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: ''
    }

    signUp = (event) => {
        event.preventDefault()
        this.props.signUp(
            this.state.email,
            this.state.password,
            this.state.password_confirmation
        )
    }

    signIn = (event) => {
        event.preventDefault()
        this.props.signIn(
            this.state.email,
            this.state.password
        )
    }

    handleChange = (event) => {
        const newState = {...this.state}
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    render() {
        return (
          <center>
            <LoginWrap>
                <Form className="signIn">
                    <Form.Field>
                        <label htmlFor="email">E-mail: </label>
                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password_confirmation">Confirm Password: </label>
                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                               value={this.state.password_confirmation}/>
                    </Form.Field>
                      <center>
                    <Button onClick={this.signUp}>Sign Up</Button>
                    <Button onClick={this.signIn}>Log In</Button>
                    </center>
                </Form>
            </LoginWrap>
            </center>
        )
    }
}

export default SignUpLogIn