import React from 'react';
import Car from './Car'
import {Button} from 'semantic-ui-react'
import styled from 'styled-components'

const CarTitle= styled.h1`
color: red;
`

const CardWrap = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-content: center;
width: 100vw;
color: red;

`

const CarsList= (props) => {

  const cars = props.cars.map((car) => {
    return (
      <Car
      {...car}
      key={car.id}
      />
    )
  })

  return (
    <div>
    <center>
      <CarTitle>Cars</CarTitle>
    <CardWrap>
        {cars}
    </CardWrap>
    </center>
    <br/>
    <center>
      <Button>Add Car</Button>
    </center>
    </div>
  )
}

export default CarsList;