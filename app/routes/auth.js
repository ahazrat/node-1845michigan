var passport = require('passport');
var Account = require('./app/models/account');
var express = require('express');
var router = express.Router();

router.route('/register')
  .get(function (req, res, next) {
    res.render('register', {});
  })
  .post(function (req, res, next) {
    Account.register(new Account({ username: req.body.username }), req.body.something, function (err, account) {
      if (err) {
        return res.render('register', { account: account });
      }
      req.login(account, function (err) {
        if (err) { return console.log(err); }
        res.redirect('/contacts');
      });
    });
    
  });

router.get('/login', function (req, res, next) {
  res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res, next) {
  res.redirect('/contacts');
});

router.all('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;