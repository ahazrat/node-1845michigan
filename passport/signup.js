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
                    newUser.role = 'user';
                    newUser.pic = 'http://i.imgur.com/zhrTqT5.jpg';
                    newUser.lastname = req.body.lastname;
                    newUser.firstname = req.body.firstname;
                    newUser.password = createHash(password);
                    newUser.email = username;
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