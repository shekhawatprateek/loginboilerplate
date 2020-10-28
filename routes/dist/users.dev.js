"use strict";

var express = require('express');

var router = express.Router(); // Login Page 

router.get('/login', function (req, res) {
  res.render('login');
}); // Register Page 

router.get('/register', function (req, res) {
  res.render('register');
});
router.post('/register', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      password2 = _req$body.password2;
  var errors = []; // Check Require Fields 

  if (!name || !email || !password || !password2) {
    errors.push;
  }
});
module.exports = router;