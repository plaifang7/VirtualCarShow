import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Button, Image } from 'semantic-ui-react'



const Car = (props) => {
  return (
    
    <Card className="carCard">
      <Image src={props.image} alt={props.model} width ="400"/>
      <Card.Content>
        <p>{props.year} {props.make} {props.model}</p>
        <p>Color: {props.color}</p>
        <p>Rating: {props.rating}</p>
        <Link to={`/cars/${props.id}`}><Button>View Car Profile</Button></Link>
      </Card.Content>
    </Card>
   
  )
}

export default Car;