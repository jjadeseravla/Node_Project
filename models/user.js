let mongoose = require('mongoose');

//User Schema
let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

let User = module.exports = mongoose.model('User', userSchema);
