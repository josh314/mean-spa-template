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
          {title: "Foo", route:"/foo", state:"main.foo", divider: true},
          {title: "Bar", route: "/bar", state:"main.bar"},
          {title: "Baz", route: "/baz", state:"main.baz"},
        ]
      },
      {title: "About", route: "/about", state:"main.about"},
    ]
  };
  app.constant('navbarData', navbar);
})();
