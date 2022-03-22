var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
  listMessages : [String],
  user1 : String,
  user2 : String
  
});

module.exports = mongoose.model('Conversation', ConversationSchema);