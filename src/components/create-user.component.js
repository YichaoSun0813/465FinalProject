import React, { Component } from 'react';
import "./style.css";
const qs = require('qs');
const axios = require('axios').default;

export default class CreateUser extends Component {
    constructor(props) {
        super(props);  

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
          
        this.state = {
            username: '',
            location: ''
        };
    }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }
  onChangeLocation(e) {
      this.setState({location: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();

    console.log("creating user");

    //need to stringify all of the state variables for JSON
    const newUser = {
        username: JSON.stringify(this.state.username),
        location: JSON.stringify(this.state.location),
  };

  console.log(newUser);

  axios.post('http://localhost:5000/users/add', 
    newUser).then(res => 
    console.log(res.data)
    );

  this.setState({
      username: '',
      location: ''
  })

}

  render() {
    return (
        <div>
  <h3>Create New User</h3>
  <form onSubmit={this.onSubmit}>
    <div className="form-group"> 
      <label>Username: </label>
      <input  type="text"
          required
          className="form-control"
          value={this.state.username}
          onChange={this.onChangeUsername}
          />
    </div>
    <div className="form-group"> 
      <label>Where Are You From: </label>
      <input  type="text"
          required
          className="form-control"
          value={this.state.location}
          onChange={this.onChangeLocation}
          />
    </div>
    <div className="form-group">
      <br>
      </br>
      <input type="submit" value="Create User" className="btn btn-primary" />
    </div>
  </form>
</div>
    )
  }
}
