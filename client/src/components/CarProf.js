import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Image, Form } from 'semantic-ui-react'
import styled from 'styled-components'

const CarProfWrap = styled.div`
height: 100vh;
`

class CarProf extends Component {
  state = {
    car: {},
    carshows: [],
    newShow: true,
    location: '',
    city_state: '',
    date: ''

  }

  async componentDidMount() {
    let car = {}
    let carshows = []

    car = await this.showCar()
    carshows = await this.showCarShows()
    this.setState({
      car,
      carshows
    })
  }

  showCar = async () => {
    const carId = this.props.match.params.id
    const res = await axios.get(`/cars/${carId}`)
    return res.data

  }
  showCarShows = async () => {
    const carId = this.props.match.params.id
    const res = await axios.get(`/cars/${carId}/car_shows`)
    return res.data
  }

  toggleNewShow = () => {
    const newCarShow = !this.state.newShow
    this.setState({ newShow: newCarShow })
  }

  addShow = async (id) => {
    const carId = this.props.match.params.id
    await axios.post(`/cars/${carId}/car_shows/${id}`)
    this.setState({ carshows })
  }

  deleteShow = async (id) => {
    const carId = this.props.match.params.id
    await axios.delete(`/cars/${carId}/car_shows/${id}`)
    const carshows = this.showCarShows
    this.setState({ carshows })


  }


  deleteCar = async (id) => {
    await axios.delete(`/cars/${id}`)
    const cars = await this.getCars()
    this.setState({ cars })
  }

  render() {
    return (
      <CarProfWrap>
        <Card>
          <h1>{this.state.car.year} {this.state.car.model}</h1>
          <Image src={this.state.car.image} alt={this.state.car.model} width="400" />
          <Button onClick={() => this.deleteCar(this.state.car.id)}>Delete Car</Button>
        </Card>

        <div>

          {this.state.carshows.map((carshow) => {
            return (
              <Card>
                <Card.Content>
                  <h3>{carshow.location}</h3>
                  <p>{carshow.city_state}</p>
                  <p>{carshow.date}</p>
                  <Button onClick={() => this.deleteShow(carshow.id)}>Delete Show</Button>
                </Card.Content>
              </Card>
            )
          })}
          <Button onClick={this.toggleNewShow}>
            {this.state.newShow ? "Cancel" : "Add Car Show"}
          </Button>
          {this.state.newShow ?
            <div>
              <Form>
                <Form.Field>
                  <label htmlFor="location">Location Name: </label>
                  <input onChange={this.handleChange} type="text" name="location" value={this.state.location} />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="city_state">City,State: </label>
                  <input onChange={this.handleChange} type="text" name="city_state" value={this.state.city_state} />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="date">Date: </label>
                  <input onChange={this.handleChange} type="text" name="date" value={this.state.date} />
                </Form.Field>
                <center>
                  <Button onClick={this.addShow}>Add Show</Button>
                </center>
              </Form>
            </div>
            : null}
        </div>
      </CarProfWrap>
    );
  }
}

export default CarProf;