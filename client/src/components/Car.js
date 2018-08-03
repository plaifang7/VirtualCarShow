import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Button, Image } from 'semantic-ui-react'

const CarWrap = styled.div`

.carCard{
  background-color: yellow;
}
.viewCar{
color: red;
background-color: black;
}
.viewCar:hover{
color: yellow;
background-color: red;
}

`

const Car = (props) => {
  return (
    <CarWrap>
    <Card className="carCard">
      <Image src={props.image} alt={props.model} width ="400" height ="300"/>
      <Card.Content>
        <p>{props.year} {props.make} {props.model}</p>
        <p>Color: {props.color}</p>
        <p>Rating: {props.rating}</p>
        <Link to={`/cars/${props.id}`}><Button className="viewCar">View Car Profile</Button></Link>
      </Card.Content>
    </Card>
    </CarWrap>
  )
}

export default Car;