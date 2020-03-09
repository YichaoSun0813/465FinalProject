import React, { Component } from 'react';
import "./style.css";

//qs not used. not sure why it would not stringify
//an object. using JSON.stringify instead
const qs = require('qs');
//axios allows us to send HTTP requests to the backend
const axios = require('axios').default;

export default class CreateUser extends Component {
    constructor(props) {
        super(props);  

        //im really curious if this is the way you change state
        //variables in react or if there are other ways
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
          
        this.state = {
            username: '',
            location: ''
        };
    }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeLocation(e) {
      this.setState({
        location: e.target.value
      });
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

  //send off the new user to aws mongoDb via atlas
  axios.post('http://localhost:5000/users/add', 
    newUser)
    .then(res => 
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
          id="class1"
          required
          className="form-control"
          value={this.state.username}
          onChange={this.onChangeUsername}
          />
    </div>
    <div className="form-group"> 
      <label>Where Are You From: </label>
      <input  type="text"
          id="class1"
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
