var myApp = angular.module('myApp', ['ui.router']);

var auth = function (req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
};

myApp.service('fsUser', function($http, $q) {
  var _user = {};
  
  this.loggedIn = function () {
    if (_user) { return true; }
    return false;
  };
  
  this.setUser = function (user) {
    _user = user;
  };
  
  this.getUser = function () {
    return _user;
  };
  
  this.setFirstName = function (firstname) {
    _user.firstname = firstname;
  };

  this.getFirstName = function () {
    return _user.firstname;
  };

  this.fullName = function () {
    return _user.firtname + ' ' + _user.lastname;
  };
  
});

myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/home');
  
  $httpProvider.interceptors.push(function ($q, $location) {
    return {
      response: function (response) {
        // do something on success
        return response;
      },
      responseError: function (response) {
        if (response.status === 401)
          $location.url('/login');
        return $q.reject(response);
      }
    };
  });
  
  $stateProvider
  
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
    
    .state('admin', {
      url: '/admin',
      templateUrl: 'templates/admin/index.html',
      controller: function ($scope) {
        $scope.apothic = "d3 functionality lives on the page";
        $scope.dataArray = [10, 20, 30, 40, 50, 60];
      }
    })
    
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile/index.html',
      controller: function ($scope, fsUser) {
        $scope.supsup = 'Sup';
        
        $scope.ctrlUser = fsUser.getFirstName();
        
      }
    })
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/authentication/login.html',
      controller: function ($scope, $http, $location, fsUser) {
        
        $scope.login = function () {
          $http.post('/login', $scope.tempUser)
            .success(function (data) {
              console.log('Login successfull!');
              fsUser.setUser(data);
              console.log(fsUser.getFirstName());
            })
            .error(function (data) {
              console.log('Login error');
            });
          $location.path('/profile');
        };
        
      }
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'templates/authentication/logout.html',
      controller: function ($scope, $http, $location) {
        
        $http.get('/logout')
          .success(function (data) {
            console.log('Logout successful');
          })
          .error(function (data) {
            console.log('Logout error');
          });
        
        setTimeout(function () {
          $location.path('/login');
          $scope.$apply();
        }, 2000);
        
      }
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
    controllerAs: 'navCtrl',
    bindToController: true,
    controller: function (fsUser) {
      var vm = this;
      
      vm.hellotest = fsUser.getFirstName();
      
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
    $http.post('/signup', vm.newUser)
      .then(
        function (data) {
          console.log('Success: ' + data);
          $location.path('/admin');
        },
        function (data) {
          console.log('Error: ' + data);
        }
      );
  };
  
});

myApp.controller('loginCtrl', function ($http, $location) {
  var vm = this;
  
  vm.login = function () {
    $http.post('/');
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