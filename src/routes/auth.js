const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

const verify = async (email, password, done) => {
    await User.findByEmail(email, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!User.verifyPassword(user, password)) {
            return done(null, false);
        }
        return done(null, user);
    })
};

const options = {
    usernameField: 'email',
    passwordField: 'password'
}

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    }); 
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    try {
        const newUser = new User({email, password});
        await newUser.save();
        res.status(201).json({id: newUser._id, token: uuidv4()});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

router.post('/login',
    passport.authenticate('local', { failureMessage: true }),
    (req, res) => {
        res.status(200).json({id: req.user.id, token: uuidv4()});
    }
);

router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
          return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(204).send();
      });
});

module.exports = router;