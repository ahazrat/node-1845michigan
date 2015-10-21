var UserInfo = require('../app/models/user');
var login = require('./login');
var signup = require('./signup');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        UserInfo.findById(id, function (err, user) {
            done(err, user);
        });
    });
    login(passport);
    signup(passport);
};