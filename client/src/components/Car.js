import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const Car = (props) => {
  return (
    <div>
      <img src={props.image} alt={props.model} width ="400"/>
      <div>
        <p>{props.year} {props.make} {props.model}</p>
        <p>Color: {props.color}</p>
        <p>Rating: {props.rating}</p>
        <Link to={`/cars/${props.id}`}><button>View Car Profile</button></Link>
      </div>
    </div>
  )
}

export default Car;