const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.signUpUser = (req, res) => {
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
        message: 'Invalid sign up details, try different email!'
      });
    });
  })
};

exports.login = (req, res) => {
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
      process.env.JWT_KEY,
      { expiresIn: "1h"}
    );
    res.status(200).json({
      token,
      userId: user._id,
      message: 'Login success',
      expiresIn: 3600
    })
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Authentication Failed'
    })
  });
};
