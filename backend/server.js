const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

console.log("attempting to acquire connection to DB");
connection.once('open', () => {
    console.log("MongoDB connection established");
})

//set up a route to the routes folder
const dinersRouter = require('./routes/diners');
const usersRouter = require('./routes/users');

app.use('/diners', dinersRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});