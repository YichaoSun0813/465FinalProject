//express is a simple web framework for node.js
const express = require('express');
//cors allows AJAX requests to access resources from remote
//hosts without dealing the the same-origin-policy
//Todo: (Kris) read up on 'same-origin-policy'
const cors = require('cors');
//mongoose makes communicating with MongoDB through Node.js easier
const mongoose = require('mongoose');

//dotenv allows you to store and retrieve environment variables
//in a file rather than setting them in a machine
require('dotenv').config();

const app = express();
//listen on port 5000 unless otherwise specified
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

//once a connection to the DB is established log to the console
console.log("attempting to acquire connection to DB");
connection.once('open', () => {
    console.log("MongoDB connection established");
})

//load the routers from specified files
const dinersRouter = require('./routes/diners');
const usersRouter = require('./routes/users');

//the routers are then added to the middleware
app.use('/diners', dinersRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});