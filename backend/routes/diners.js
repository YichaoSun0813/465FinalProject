const router = require('express').Router();
let Diner = require('../models/diner.model');

router.route('/').get((req, res) => {
  Diner.find()
    .then(diners => res.json(diners))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const dinerName = req.body.dinername;
  const description = req.body.description;
  const location = req.body.location;

  const newDiner = new Diner({
    username,
    dinerName,
    description,
    location,
  });

  newDiner.save()
  .then(() => res.json('Diner added to the DB!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;