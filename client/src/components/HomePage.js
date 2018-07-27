import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Virtual Car Show</h1>
        <p>Find all your dream cars and where they will be hosting next</p>
        <Link to="/signUp"><button>Enter</button></Link>
      </div>
    );
  }
}

export default HomePage;