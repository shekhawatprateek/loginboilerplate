const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


// User Model 
const User = require('../models/User');

// Login Page 
router.get('/login', (req, res) => {
    res.render('login')
});

// Register Page 
router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check Require Fields 
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'})
    }

    // Check Passwords Match 
    if(password !== password2){
        errors.push({ msg: 'Passwords does not match!'})
    }

    // Check Passwords Length 
    if(password.length < 6){
        errors.push({ msg: 'Passwords ahould atleast 6 characters'})
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation Pass 
         User.findOne({ email: email })
         .then(user => {
             if(user) {
                //  User Exists 
                errors.push({ msg: "Email is already registered" })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
             } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                //    HashPassword 
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err)throw err;
                            // Set password to hash 
                            newUser.password = hash;
                            // Save the user 
                            newUser.save()
                            .then(user => {
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                        })
                    )
             }
         })
         
    }

})



module.exports = router;