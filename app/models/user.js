var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  email: String,
  password_hash: String,
  firstname: String,
  lastname: String,
  pic: String,
  role: String
});