const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');

router.get('/message', (req, res) => {
    messageCtrl.getAllMessages(req, res);
});

router.post('/message', (req, res) => {
    messageCtrl.createMessage(req, res);
});

router.get('/message/:id', (req, res) => {
    messageCtrl.getOneMessage(req, res);
});

router.delete('/message/:id', (req, res) => {
    messageCtrl.deleteMessage(req, res);
});

module.exports = router;