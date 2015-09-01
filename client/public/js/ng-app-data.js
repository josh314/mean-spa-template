(function() {
  'use strict';
  var app = angular.module("myApp");

  var navbar = {
    brand: {title:"Your Site", route:"/", state:"main.home"},
    navItems: [
      {
        title:"Stuff",
        state:"main.stuff",
        drops: [
          {title:"Stuff 1", route:"/stuff1", state:"main.stuff1", divider: true},
          {title: "Stuff 2", route: "/stuff2", state:"main.stuff2"},
          {title: "Stuff 3", route: "/stuff3", state:"main.stuff3"},
        ]
      },
      {title: "Blog", route: "/blog", state:"main.blog"},
      {title: "About", route: "/about", state:"main.about"},
    ]
  };
  app.constant('navbarData', navbar);
})();
