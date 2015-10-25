var Project = require('./models/project');
var User = require('./models/user');

var auth = function (req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    return next();
};

module.exports = function (app, passport) {
  
  // api
  // get all projects
  // app.get('/api/projects', auth, function (req, res) {
  app.get('/api/projects', function (req, res) {
    Project.find(function (err, projects) {
      if (err) { res.send(err); }
      res.json(projects);
    });
  });
  // post new project
  app.post('/api/projects');
  
  // demo stuff to delete
  // get all todos
  app.get('/api/todos', function (req, res) {
    Todo.find(function (err, todos) {
      if (err) { res.send(err); }
      res.json(todos);
    });
  });
  // create todo and send back all todos
  app.post('/api/todos', function (req, res) {
    Todo.create({
      text: req.body.text,
      done: false
    }, function (err, todo) {
      if (err) { res.send(err); }
      res.redirect('/api/todos');
    });
  });
  // delete a todo
  app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function (err, todo) {
      if (err) { res.send(err); }
      res.redirect('/api/todos');
    });
  });
  
  // application
  // get index
  app.get('*', function (req, res) {
    res.sendfile('./public/index.html');
  });
  
  // authentication
  app.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });
  app.post('/signup', passport.authenticate('signup'), function (req, res) {
    console.log('Reached post /signup callback');
    console.log(req.user);
    res.json(req.user);
  });
  app.post('/login', passport.authenticate('login', {
    // successRedirect: '/admin',
    // failureRedirect: '/login',
    // failureFlash: true
  }));
  app.post('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
  });
  
};