let mongoose = require('mongoose');

let LoginSchema = new mongoose.Schema({
  pass: {type: String, required : true},
  email: {type: String, required : true},
  temp: {type: Boolean}
});

module.exports = mongoose.model('Login', LoginSchema);