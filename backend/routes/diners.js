const router = require('express').Router();
let Diner = require('../models/diner.model');

//Todo: (Kris) create a way to delete diners from the database 
//as well as edit for a fully functional CRUD app

//get request returns all diners
router.route('/').get((req, res) => {
  //find all diners in DB
  Diner.find()
    .then(diners => res.json(diners))
    .catch(err => res.status(400).json('Error: ' + err));
});

//post request adds a new diner to the DB
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const dinerName = req.body.dinername;
  const description = req.body.description;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const newDiner = new Diner({
    username,
    dinerName,
    description,
    latitude,
    longitude,
  });

  //save the new diner to the DB
  newDiner.save()
  .then(() => res.json('Diner added to the DB!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;