module.exports =
{
  title: 'A Sweet Single-Page Web Application',
  description: "Can anything really have, like, a description, man? Ya know, if you think about it?",
  dev: {
    stylesheets: [
      "/stylesheets/build/app.css"
    ],
    scripts: {
      ext: [
        "/3rd-party/jquery.js",
        "/3rd-party/angular.js",
        "/3rd-party/angular-sanitize.js",
        "/3rd-party/angular-ui-router.js",
        "/3rd-party/angular-animate.js",
        "/3rd-party/ui-bootstrap-tpls-0.11.0.js",
      ],
      local: [
        "/js/ie8-forEach-shim.js",
        "/js/ios_keyboard.js",
        "/js/ng-app-init.js",
        "/js/ng-app-data.js",
        "/js/ng-app-config.js",
        "/js/build/ng-app-precache.js",
        "/js/ng-app-run.js",
        "/js/ng-app.js",
      ]
    },
  },
  prod: {
    stylesheets: [
      "/stylesheets/build/app.min.css"
    ],
    scripts: {
      ext: [
        "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js",
        "//ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular.min.js",
        "//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js",
        "//ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-animate.min.js",
        "//ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-sanitize.min.js",
        "//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.11.0.min.js",
      ],
      local: [
        "/js/build/client.min.js"
      ]
    }
  },
};
