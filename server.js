// set up
var express = require('express');
var app = express();
var path = express('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var morgan = require('morgan');  // log requests to the console (express4)
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportConfig = require('./passport/init');
var expressSession = require('express-session');

// config database
var db = require('./config/database');
var MongoURI = process.env.MONGOURI || db.url;
mongoose.connect(MongoURI, function (err, res) {
  if (err) {
    console.log('Error connecting to: ' + MongoURI + '. ' + err);
  } else {
    console.log('MongoDB connected successfully to ' + MongoURI);
  }
});

// config other
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));  // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(favicon(__dirname + '/public/favicon.ico'));

// authentication
app.use(expressSession({secret: 'Grumpy Cat'}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// routes
require('./app/routes')(app, passport);
// var routes = require('./app/routes/index');
// var contacts = require('./app/routes/contacts');
// var auth = require('./app/routes/auth');

// listen
app.listen(port);
console.log('App listening on port ' + port);