import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Image, Form } from 'semantic-ui-react'
import styled from 'styled-components'

const CarProfWrap = styled.div`
height: 100vh;
`

const AddCarShowForm = styled.div`
width: 50vh;
background-color: red;
.loginField{
  width: 45%;
}

`

class CarProf extends Component {
  state = {
    car: {},
    carshow: [],
    newShow: false,
    location: '',
    city_state: '',
    date: ''

  }

  async componentDidMount() {
    let car = {}
    let carshow = []

    car = await this.showCar()
    carshow = await this.showCarShows()
    this.setState({
      car,
      carshow
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

  handleChange = (event) => {
    const inputName = event.target.name
    const userInput = event.target.value
    this.setState({
      [inputName]: userInput
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const carId = this.props.match.params.id
    axios.post(`/cars/${carId}/car_shows`, this.state)
      .then(res => {
        window.location.reload()
      })


  }
  deleteShow = async (id) => {
    const carId = this.props.match.params.id
    await axios.delete(`/cars/${carId}/car_shows/${id}`)
    const carshow = this.showCarShows
    this.setState({ carshow })


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

      

          {this.state.carshow.map((carshow) => {
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
          <div>
            <center>
              <Button onClick={this.toggleNewShow}>
                {this.state.newShow ? "Cancel" : "Add Car Show"}
              </Button>
              <br />
              {this.state.newShow ?
                <AddCarShowForm>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Field className="loginField">
                      <label htmlFor="location">Location Name: </label>
                      <input
                        onChange={this.handleChange}
                        type="text"
                        name="location"
                        value={this.state.location} />
                    </Form.Field>
                    <Form.Field className="loginField">
                      <label htmlFor="city_state">City,State: </label>
                      <input
                        onChange={this.handleChange}
                        type="text"
                        name="city_state"
                        value={this.state.city_state} />
                    </Form.Field>
                    <Form.Field className="loginField">
                      <label htmlFor="date">Date: </label>
                      <input
                        onChange={this.handleChange}
                        type="date"
                        name="date"
                        value={this.state.date} />
                    </Form.Field>
                    <center>
                      <Button type="submit">Add Show</Button>
                    </center>
                  </Form>
                </AddCarShowForm>
                : null}
            </center>
          </div>
        
      </CarProfWrap>
    );
  }
}

export default CarProf;