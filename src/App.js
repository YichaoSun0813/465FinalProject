import React from 'react';
//inport react router
import { BrowserRouter as Router, Route } from "react-router-dom";
//add bootstrap for easy stylin
import "bootstrap/dist/css/bootstrap.min.css";

//import the files that are loaded when certain paths are hit
import Navbar from "./components/navbar.component"
import Landing from "./components/landing.component"
import DinersList from "./components/diners-list.component";
import AddDiner from "./components/add-diner.component";
import CreateUser from "./components/create-user.component";

//a route element for each route in the application
//along wiht its corresponding path
//'component' is loaded when user goes to a certain path
function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={Landing} />
      <Route path="/diners" component={DinersList} />
      <Route path="/create" component={AddDiner} />
      <Route path="/user" component={CreateUser} />
    </div>
    </Router>
  );
}

export default App;