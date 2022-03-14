const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);

router.post('/login', (req, res) => {

    userCtrl.login(req, res);
  
  });

module.exports = router;