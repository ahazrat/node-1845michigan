// set up
var express = require('express');
var app = express();
var path = express('path');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var db = require('./config/database');
var morgan = require('morgan');  // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport');
var passportConfig = require('./passport/init');
var expressSession = require('express-session');

// config
mongoose.connect(db.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));  // parse application/vnd.api+json as json
app.use(methodOverride());

// authentication
app.use(expressSession({secret: 'Grumpy Cat'}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// routes
require('./app/routes')(app, passport);

// listen
app.listen(port);
console.log('App listening on port ' + port);