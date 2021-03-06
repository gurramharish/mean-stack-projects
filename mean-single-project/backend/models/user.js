const mongoose = require('mongoose');

const mongooseUniqueValidator = require('mongoose-unique-validator');

const userScheme = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

userScheme.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userScheme);
