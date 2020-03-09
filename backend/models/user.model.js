const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//'userSchema' contains:
//string: username
//string: location (city)
const userSchema = new Schema({
  
  //validation used to ensure names are entered and unique
  //also, trailing spaces are removed from name
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  //only trailing spaces are removed from location
  location: {
      type: String,
      required: false,
      unique: false,
      trim: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;