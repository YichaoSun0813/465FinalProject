import React, { Component } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav id="background" className="navbar navbar-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Let's Find A Diner</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/diners" className="nav-link">Diners</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Add A Diner</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
