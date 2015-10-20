var mongoose = require('mongoose');

module.export = mongoose.model('User', {
  email: String,
  password_hash: String,
  firstname: String,
  lastname: String,
  pic: String,
  role: String
});