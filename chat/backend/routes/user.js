const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const conversationCtrl = require('../controllers/conversation');

router.post('/signup', userCtrl.signup);

router.post('/login', (req, res) => {
    userCtrl.login(req, res);
  });

router.post('/disconnection', (req, res) => {
  userCtrl.disconnection(req, res);
});

router.get('/accueil/:id', (req, res) => {
  conversationCtrl.getAllConversations(req, res);
});

module.exports = router;