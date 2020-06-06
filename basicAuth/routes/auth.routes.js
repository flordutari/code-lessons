const { Router } = require('express');
const router = new Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const mongoose = require('mongoose');

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
});

router.get('/userProfile', (req, res, next) => {
    res.render('users/user-profile');
});

router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.render('auth/signup', { 
    errorMessage: 'Las informaciones username, email y contraseña son mandatorias'
    });
        return;
    }
    bcrypt.genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
        console.log(`la hash es: ${hashedPassword}`);
        return User.create(
            {
                username: username,
                email: email,
                passwordHash: hashedPassword
            }
        );
    })
    .then(data => {
        console.log('user creater', data)
        res.redirect('/userProfile');   
    })
    .catch(err => {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).render('auth/signup', {
                errorMessage: err.message
            });
        } else {
            next(err);
        }
  
    });
});

module.exports = router;