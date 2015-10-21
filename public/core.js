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
    .state('home.projects.new', {
      url: '/new',
      templateUrl: 'templates/forms/newproject.html'
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

if (false) {
myApp.directive('fsSignup', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/authentication/signup',
    scope: {
      user: '='
    },
    controllerAs: 'suCtrl',
    bindToController: true,
    controller: function () {
      var vm = this;
      vm.foobar = "Hello";
      vm.signup = function () {
        alert();
      };
    }
  };
});
}

myApp.controller('mainCtrl', function ($http) {
  var vm = this;
  
  // fetch projects
  vm.refreshProjects = function () {
    $http.get('/api/projects')
      .success(function (data) {
        vm.projects = data;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };
  
  // new project form
  vm.showNewProjectForm = false;
  vm.addProject = function () {
    vm.showNewProjectForm = false;
    // $http.post('/api/projects');
    vm.refreshProjects();
  };
  
  // initialize
  vm.refreshProjects();
  vm.formData = {};
  
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

myApp.controller('signupCtrl', function ($scope, $http, $location) {
  var vm = this;
  
  vm.signup = function () {
    $scope = $scope || angular.element(document).scope();
    
    $http.post('/api/users', vm.newUser)
      .success(function (data) {
        vm.newUser = {};
        console.log(data);
        $location.path('/home');
        $scope.$apply();
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
    
  };
  
});

myApp.controller('todoCtrl', function ($http) {
  var vm = this;
  
  // when landing on the page, get all the todos and show them
  vm.getTodos = function () {
    $http.get('/api/todos')
      .success(function (data) {
        vm.todos = data;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };
    
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