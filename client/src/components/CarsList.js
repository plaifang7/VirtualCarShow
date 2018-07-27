import React from 'react';
import Car from './Car'

const CarsList= (props) => {

  const cars = props.cars.map((car) => {
    return (
      <Car
      {...car}
      deleteCar={props.deleteCar}
      key={car.id}
      />
    )
  })

  return (
    <div>
      <h1>Cars</h1>
        {cars}
    </div>
  )
}

export default CarsList;