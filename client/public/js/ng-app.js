(function() {
  'use strict';
  /************************************************************************
  ************************ Angular app ************************************
  *************************************************************************/
  var app = angular.module('myApp');

  /***********************************************************************
  *********************** Controllers ************************************
  ************************************************************************/


  /******************* Navbar Controller *************************/
  app.controller('NavbarCtrl', ['$scope', 'navbarData', function($scope, navbarData) {
    $scope.navbar = navbarData;

    $scope.isCollapsed = true;
    $scope.toggleCollapse  = function() { $scope.isCollapsed = !$scope.isCollapsed; };
    $scope.collapse = function() {$scope.isCollapsed = true; };
    $scope.expand = function() {$scope.isCollapsed = false;};

    $scope.dropdownOpen = false;
    $scope.dropdownCollapse = function() {$scope.dropdownOpen = false; };
  }]);
  /******************* Flash Message controller *******************************/
  app.controller('FlashCtrl', ['$scope', function($scope) {
    $scope.isHidden = false;
    $scope.closeFlash = function () {
      $scope.isHidden = true;
    };
  }]);
  /****************** Blog page controller ************************************/
  app.controller('BlogCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.articles = [];
    $http.get('/api/find').success(function(data) {
      $scope.articles = data.results;
    });
  }]);
  /***********************************************************************
  ************************ Directives ************************************
  ************************************************************************/

  /*********************** Navbar Directive ***********************/
  app.directive('navbarDirective', function(){
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/partials/_navbar.html',
      controller: 'NavbarCtrl',
    };
  });
  /*********************** Footer Directive ***********************/
  app.directive('footerDirective', function(){
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/partials/_footer.html',
    };
  });
})();
