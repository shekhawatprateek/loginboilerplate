"use strict";

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: True
  },
  email: {
    type: String,
    required: True
  },
  password: {
    type: String,
    required: True
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = Users;