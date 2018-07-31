import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import styled from 'styled-components'

const HomeWrap = styled.div`
background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Lamborghini_Urus_20180306_Genf_2018.jpg/1200px-Lamborghini_Urus_20180306_Genf_2018.jpg');
background-size: cover;
background-repeat: no-repeat;
background-position: center;
width: 100vw;
height: 100vh;
color: red;
margin-top: 100px;

`
const IntroWrap = styled.div`
padding-top: 200px;
text-align: center;
h1{
  text-shadow: 2px 2px black;
}
h4{
  text-shadow: 2px 2px black;
}


.enter{
  background-color: black;
  color: yellow;
}

.enter:hover{
  background-color: red;
}


`

class HomePage extends Component {
  render() {
    return (
      <center>
      <HomeWrap>
        <IntroWrap>
        <h1>Virtual Car Show</h1>
        <h4>Find all your dream cars and where they will be hosting next</h4>
        <Link to="/signUp"><Button className="enter">Enter</Button></Link>
        </IntroWrap>
      </HomeWrap>
      </center>
    );
  }
}

export default HomePage;