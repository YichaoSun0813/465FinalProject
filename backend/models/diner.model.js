const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dinerSchema = new Schema({
  username: { type: String, required: true },
  dinerName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
}, {
  timestamps: true,
});

const Diner = mongoose.model('Diner', dinerSchema);

module.exports = Diner;