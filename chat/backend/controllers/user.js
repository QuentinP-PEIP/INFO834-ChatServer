const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User= require('../models/User');

function signup (req, res, next) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.redirect('/accueil'))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

function login (req, res, next) {
User.findOne({ email: req.body.email })
    .then(user => {
    if (!user) {
        console.log("EMAIL : " + req.body.email + " PASSWORD : " + req.body.password)
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
        if (!valid) {
            console.log("EMAIL : " + req.body.email + " PASSWORD : " + req.body.password)
            console.log("USER PASSWORD : " + user.password)
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }

        else {
          console.log("C'EST VALIDE")
          res.redirect('/accueil');
        }

        /*
        res.status(200).json({
            userId: user._id,
            userEmail: req.body.email,
            userPassword: req.body.password,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
        });   
        */  
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


module.exports.login = login;
module.exports.signup = signup;