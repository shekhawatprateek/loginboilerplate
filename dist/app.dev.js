"use strict";

var express = require('express');

var expressLayouts = require('express-ejs-layouts');

var mongoose = require('mongoose');

var app = express(); // DB config 

var db = require('./config/keys').MongoURI; // Connect to Mongo


mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB Connected...');
})["catch"](function (err) {
  return console.log(err);
}); // EJS 

app.use(expressLayouts);
app.set('view engine', 'ejs'); // BodyParser 

app.use(express.urlencoded({
  extended: false
})); // Routes 

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
var PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server started on port ".concat(PORT)));