var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt');
var userModel = require('../models/user.model');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        userModel.singleByUserName(username).then(rows => {
            if (rows.length === 0) {
                return done(null, false, { message: 'Invalid username!!' })
            }

            var user = rows[0];
            if (user.MatKhau === password) {
                ret = true;
            } else {
                ret = false;
            }

            if (ret) {

                return done(null, user);
            }
            return done(null, false, { message: 'Invalid pass!!' })

        }).catch(err => {
            return done(err, false);
        })
    });


    passport.use('local', ls);

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });

}