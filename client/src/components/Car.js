import React, { Component } from 'react';

const Car = (props) => {
  return (
    <div>
      <img src={props.image} alt={props.model} width ="400"/>
      <div>
        <p>{props.year} {props.make} {props.model}</p>
        <p>Color: {props.color}</p>
        <p>Rating: {props.rating}</p>
        <button>View Car Profile</button>
      </div>
    </div>
  )
}

export default Car;