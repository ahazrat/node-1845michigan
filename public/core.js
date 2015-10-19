var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');
  
  $stateProvider
  
    // home
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home/index.html'
    })
    .state('home.projects', {
      url: '/projects',
      templateUrl: 'templates/tables/projects.html'
    })
    .state('home.events', {
      url: '/events',
      templateUrl: 'templates/tables/events.html'
    })
    
    // about
    .state('about', {
      url: '/about',
      views: {
        '': { templateUrl: 'templates/about/index.html' },
        'columnOne@about': { template: 'Look I am a column!' },
        'columnTwo@about': {
          templateUrl: 'templates/tables/projects.html',
          controller: 'aboutCtrl'
        }
      }
    })
    
    // admin
    .state('admin', {
      url: '/admin',
      templateUrl: 'templates/admin/index.html'
    })
    
    // profile
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile/index.html'
    })
    
    // authentication
    .state('login', {
      url: '/login',
      templateUrl: 'templates/authentication/login.html'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'templates/authentication/logout.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/authentication/signup.html'
    });
  
});

myApp.directive('fsNavbar', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/navbar.html',
    scope: {
      user: '='
    },
    controllerAs: 'na',
    bindToController: true,
    controller: function () {
      var nb = this;
      nb.user = {
        firstname: 'Asif',
        lastname: 'Hazrat',
        role: 'Admin'
      };
    }
  };
});

myApp.controller('mainCtrl', function ($http) {
  var vm = this;
  
  vm.refreshProjects = function () {
    $http.get('/api/projects')
      .success(function (data) {
        vm.projects = data;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };
  vm.showNewProjectForm = false;
  vm.toggleNewProjectForm = function () {
    vm.showNewProjectForm = vm.showNewProjectForm === true ? false : true;
  };
  vm.addProject = function () {
    vm.showNewProjectForm = false;
    // $http.post('/api/projects');
    vm.refreshProjects();
  };
  
  vm.refreshProjects();
  
  vm.formData = {};
  
  // when landing on the page, get all the todos and show them
  $http.get('/api/todos')
    .success(function (data) {
      vm.todos = data;
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
    
  // when submitting the add form, send the text to node API
  vm.createTodo = function () {
    $http.post('/api/todos', vm.formData)
      .success(function (data) {
        vm.formData = {};
        vm.todos = data;
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };
  
  // delete a todo after checking it
  vm.deleteTodo = function (id) {
    $http.delete('/api/todos' + id)
      .success(function (data) {
        vm.todos = data;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };  
  
});

myApp.controller('aboutCtrl', function () {
  var vm = this;
  
  vm.message = 'test';
  
  vm.scotches = [
    {
      name: 'Macallan 12',
      price: 50
    },
    {
      name: 'Chivas Regal Royal Salute',
      price: 10000
    },
    {
      name: 'Glenfiddich 1937',
      price: 20000
    }
  ];
  
  
});