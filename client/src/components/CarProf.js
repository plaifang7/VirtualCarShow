import React, { Component } from 'react';
import axios from 'axios'

class CarProf extends Component {
  state = {
    car: {},
    car_shows: []

  }

  async componentDidMount(){
    let car = {}
    let car_shows =[]

    car = await this.showCar()
    car_shows = await this.showCarShows()
    this.setState({
      car, 
      car_shows})
  }

  showCar = async () => {
  const carId = this.props.match.params.id
   const res = await axios.get(`/cars/${carId}`)
   return res.data 
   
  }
  showCarShows = async () => {
    const carId =this.props.match.params.id
    const res = await axios.get(`/cars/${carId}/car_shows`)
    return res.data
  }

  render() {
    return (
      <div>
        <div>
       <h1>{this.state.car.year} {this.state.car.model}</h1>
       <img src={this.state.car.image} alt={this.state.car.model} width ="400" />
       
       </div>
       <div>
         {this.state.car_shows.map((carshow) => {
           return (
             <div>
               <h3>{carshow.location}</h3>
               <p>{carshow.city_state}</p>
               <p>{carshow.date}</p>
              <button>Delete Show</button>
             </div>
           )
         })}
       </div>
       <div>
         <button>Add Show</button>
       </div>
      </div>
    );
  }
}

export default CarProf;