var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  contenu : String,
  senderId : String,
});

module.exports = mongoose.model('Message', MessageSchema);