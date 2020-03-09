const mongoose = require('mongoose');

//'dinerSchema' contains:
//String: username
//String: diner name
//String: description
//String: latitude
//String: longitude
const Schema = mongoose.Schema;

const dinerSchema = new Schema({
  username: { type: String, required: true },
  dinerName: { type: String, required: true },
  description: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
}, {
  timestamps: true,
});

const Diner = mongoose.model('Diner', dinerSchema);

module.exports = Diner;