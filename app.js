const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// DB config 
const db = require('./config/keys').MongoURI;

// Connect to Mongo
 mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

// EJS 
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser 
app.use(express.urlencoded({ extended: false }));

// Express Session Middleware 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

// Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


