import React, { Component } from 'react';
import axios from 'axios'

class CarProf extends Component {
  state = {
    cars: {},
    carShows: []

  }

  async componentDidMount(){
    let cars = []
    cars = await this.showCar()
    this.setState({cars})
  }

  showCar = async () => {
    const carId = this.props.match.params.id
   const res = await axios.get(`/cars/${carId}`)
   return res.data
  }

  render() {
    return (
      <div>
        <div>
       <h1>{this.state.cars.year} {this.state.cars.model}</h1>
       <img src={this.state.cars.image} alt={this.state.cars.model} width ="400" />
       </div>
       <div>
         Car Shows
       </div>
      </div>
    );
  }
}

export default CarProf;