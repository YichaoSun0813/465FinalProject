import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import Landing from "./components/landing.component"
import DinersList from "./components/diners-list.component";
import AddDiner from "./components/add-diner.component";
import CreateUser from "./components/create-user.component";

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