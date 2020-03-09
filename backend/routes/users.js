const router = require('express').Router();
let User = require('../models/user.model');

console.log("in the users route");

//handle the get requests 
//return all users
router.route('/').get((req, res) => {
  //find all users
  //find method returns a promise
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//handle the post requests
//add a new user to the DB
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const location = req.body.location;

  const newUser = new User({
    username, 
    location,
  });

  //save the new user into the database
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;