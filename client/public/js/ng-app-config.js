(function() {
  'use strict';
  /********************* Config & Routes *********************************/
  angular.module('myApp').config(
    ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
      function($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $urlMatcherFactoryProvider.strictMode(false);

        // Create an array of state objects to be registered with $stateProvider
        var states = [];

        // Top-level abstract state
        states.push({ name:'main', abstract: true, templateUrl: '/partials/_main.html'});

        // Home page
        states.push({ name:'main.home', url: '/', templateUrl: '/partials/_home.html'});

        // About page
        states.push({ name:'main.about', url: '/about', templateUrl: '/partials/_about.html'});

        // Stuff pages
        states.push({ name:'main.foo', url: '/foo', templateUrl: '/partials/_foo.html'});
        states.push({ name:'main.bar', url: '/bar', templateUrl: '/partials/_bar.html'});
        states.push({ name:'main.baz', url: '/baz', templateUrl: '/partials/_baz.html'});

        angular.forEach(states, function(state) { $stateProvider.state(state); });
  }]);
})();
