const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// var user = mongoose.model('User');
// model of customers details
// var customerDetailsModel = require('../database/models/customers-details');

// var userModel = require('../database/models/user');
var user = require('../database/mongo/models/user');

passport.use(
    new localStrategy({ usernameField: 'email'},
        (username, password, done) => {
        user.findOne({ email: username},
            (err, user) => {
                if (err) {
                    return done(err);
                }
                // unknown user
                else if (!user) {
                    return done((null, false, { message: 'Email is not registered'}));
                }
                // wrong password
                else if (!user.verifyPassword(password)) {
                    return done((null, false, { message: 'Wrong password'}));
                }
                // authentication succeeded
                else {
                    return done(null, user);
                }
            });
    })
);