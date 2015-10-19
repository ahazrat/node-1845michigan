var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
  title: String,
  status: String,
  complete: Boolean
});