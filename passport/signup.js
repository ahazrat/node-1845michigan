var LocalStrategy = require('passport-local').Strategy;
var UserDetails = require('../app/models/user');
var bcrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        var findOrCreateUser = function () {
            UserDetails.findOne({'email': username}, function (err, user) {
                if (err) {
                    console.log('Error in sign up: ' + err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists with email: ' + username);
                } else {
                    var newUser = new UserDetails();
                    newUser.email = username;
                    newUser.password = createHash(password);
                    newUser.firstname = req.param('firstname');
                    newUser.lastname = req.param('lastname');
                    newUser.role = 'user'
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in saving user: ' + user);
                        }
                        console.log('User registration successful');
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    }));
    var createHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };
};