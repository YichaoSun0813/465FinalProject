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
      this.onChangeLocation = this.onChangeLocation.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

    //create empty state variables for the component
    this.state = {
      username: '',
      dinerName: '',
      description: '',
      location: '',
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
  onChangeLocation(e) {
    this.setState({location: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();//prevent default HTML submit routine

    const diner = {
      username: this.state.username,
      dinerName: this.state.dinerName,
      description: this.state.description,
      location: this.state.location,
    };

    //log diner to console. don't forget to send to the DB!!
    console.log("diner added: ", diner);

    //TODO (Kris): axios isn't sending this off to the DB
    axios.post('http://localhost:5000/diners/add', qs.stringify(diner))
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
            <label>Location: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
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
