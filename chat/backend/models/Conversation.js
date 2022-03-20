var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
  listMessages : [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  listUsers : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);