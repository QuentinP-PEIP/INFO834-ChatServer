const express = require('express');
const router = express.Router();

const conversationCtrl = require('../controllers/conversation');

router.get('/conversation', (req, res) => {
    conversationCtrl.getAllConversations(req, res);
});

router.post('/conversation', (req, res) => {
    conversationCtrl.createConversation(req, res);
});

router.get('/conversation/:id', (req, res) => {
    conversationCtrl.getOneConversation(req, res);
});

router.put('/conversation/:id', (req, res) => {
    conversationCtrl.addMessage(req, res);
});

router.delete('/conversation/:id', (req, res) => {
    conversationCtrl.deleteConversation(req, res);
});


module.exports = router;