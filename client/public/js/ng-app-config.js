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
        states.push({ name:'main.stuff1', url: '/stuff1', templateUrl: '/partials/_stuff1.html'});
        states.push({ name:'main.stuff2', url: '/stuff2', templateUrl: '/partials/_stuff2.html'});
        states.push({ name:'main.stuff2', url: '/stuff3', templateUrl: '/partials/_stuff3.html'});

        // blog page
        states.push({ name:'main.more', url: '/more', templateUrl: '/partials/_more.html'});

        angular.forEach(states, function(state) { $stateProvider.state(state); });
  }]);
})();
