var Todo = require('./models/todo');
var Project = require('./models/project');
var User = require('./models/user');

module.exports = function (app) {
  
  // api
  // get all projects
  app.get('/api/projects', function (req, res) {
    Project.find(function (err, projects) {
      if (err) { res.send(err); }
      res.json(projects);
    });
  });
  // post new project
  app.post('/api/projects');
  
  // users
  app.post('/api/users', function (req, res) {
    User.create({
      email: req.body.email,
      password_hash: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    }, function (err, user) {
      if (err) { res.send(err); }
      res.json(user);
    });
  });
  
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
  
};