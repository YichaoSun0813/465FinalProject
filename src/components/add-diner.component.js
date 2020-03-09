import React, { Component } from 'react';
import "./style.css"
import qs from 'qs';

const axios = require('axios').default;

export default class AddDiner extends Component {
  constructor(props) {
    super(props);

      //why do i need to bind 'this' to the methods in the constructor??
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeDiner = this.onChangeDiner.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeLatitude = this.onChangeLatitude.bind(this);
      this.onChangeLongitude = this.onChangeLongitude.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

    //create empty state variables for the component
    this.state = {
      username: '',
      dinerName: '',
      description: '',
      latitude: '',
      longitude: '',
      users: []
    }
  }

  componentDidMount() {
    this.setState({ 
      users: ['test user'],
      username: 'test user'
    });
  }

  //methods to update the state properties
  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }
  onChangeDiner(e) {
    this.setState({dinerName: e.target.value});
  }
  onChangeDescription(e) {
    this.setState({description: e.target.value});
  }
  onChangeLatitude(e) {
    this.setState({latitude: e.target.value});
  }
  onChangeLongitude(e) {
    this.setState({longitude: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();//prevent default HTML submit routine

    const diner = {
      username: JSON.stringify(this.state.username),
      dinerName: JSON.stringify(this.state.dinerName),
      description: JSON.stringify(this.state.description),
      latitude: JSON.stringify(this.state.latitude),
      longitude: JSON.stringify(this.state.longitude),
    };

    //log diner to console. don't forget to send to the DB!!
    console.log("diner added: ", diner);

    //TODO (Kris): axios isn't sending this off to the DB
    axios.post('http://localhost:5000/diners/add',
      diner)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Add Your New Favorite Diner!</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Diner: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.dinerName}
                onChange={this.onChangeDiner}
                />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Latitude: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.latitude}
                onChange={this.onChangeLatitude}
                />
          </div>
          <div className="form-group">
            <label>Longitude: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.longitude}
                onChange={this.onChangeLongitude}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add New Diner" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
