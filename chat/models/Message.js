var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  contenu : String,
  utilisateura : String,
  utilisateurb : String,
});

module.exports = mongoose.model('Message', MessageSchema);