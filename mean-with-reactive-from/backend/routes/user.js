const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user');

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then((result) => {
      res.status(201).json({
        message: 'User created successfully',
        result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  })
});

router.post("/login", (req, res) => {
  let user;
  User.findOne({email: req.body.email})
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'User does not exists with the given email'
      });
    }
    user = result;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'Authentication Failed: User name/Password does not match'
      });
    }
    const token = jwt.sign(
      {email: user.email, userId: user._id},
      "use-it-from-properties-for-hash-secret",
      { expiresIn: "1h"}
    );
    res.status(200).json({
      token,
      message: 'Login success',
      expiresIn: 3600
    })
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Authentication Failed'
    })
  });
})

module.exports = router;
