import React from 'react';
import Car from './Car'
import styled from 'styled-components'


const CardWrap = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-content: center;
width: 100vw;


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
    <CardWrap>
      <h1>Cars</h1>
        {cars}
    </CardWrap>
  )
}

export default CarsList;