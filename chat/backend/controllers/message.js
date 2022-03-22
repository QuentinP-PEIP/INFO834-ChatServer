const Message = require('../models/message');

exports.createMessage = (req, res, next) => {
  const message = new Message({
    contenu: req.body.contenu,
    senderId: req.body.senderId,

  });
  message.save().then(
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
        error: error + "ca ne passe pas"
      });
      console.log("Ca ne passe pas");
    }
  );
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({
    _id: req.params.id
  }).then(
    (message) => {
      res.status(200).json(message);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.deleteMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id }).then(
    (message) => {
      if (!message) {
        res.status(404).json({
          error: new Error('No such Message!')
        });
      }
      Message.deleteOne({ _id: req.params.id }).then(
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

exports.getAllMessages = (req, res, next) => {
  Message.find()
  .then((message) => {
    res.status(200).json(message);
  }, (err) => {
    res.status(500).json(err);
  });
};
