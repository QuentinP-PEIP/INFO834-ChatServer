const Conversation = require('../models/conversation');

exports.createConversation = (req, res, next) => {
  const conversation = new Conversation({
    listMessages: (req.body.message),
    user1: req.body.senderId,
    user2: req.body.receiverId

  });
  conversation.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.getOneConversation = (req, res, next) => {
  Conversation.findOne({
    _id: req.params.id
  }).then(
    (conversation) => {
      res.status(200).json(conversation);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.addMessage = (req, res, next) => {
  const conversation = new Conversation({
    listMessages: listMessages + message,
  });
  Conversation.updateOne({_id: req.params.id}, conversation).then(
    () => {
      res.status(201).json({
        message: 'Conversation updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteConversation = (req, res, next) => {
  Conversation.findOne({ _id: req.params.id }).then(
    (conversation) => {
      if (!conversation) {
        res.status(404).json({
          error: new Error('No such Conversation!')
        });
      }
      Conversation.deleteOne({ _id: req.params.id }).then(
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
};

exports.getAllConversations = (req, res, next) => {
  Conversation.find({$or:[{user1:req.body.id}, {user2:req.body.id}]})
  .then((conversation) => {
    res.status(200).json(conversation);
  }, (err) => {
    res.status(500).json(err);
  });
};
