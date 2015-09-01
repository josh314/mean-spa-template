/* This module consumes an returns a sub-router with most of the application-specific routing.
    Its one argument is a context object to be used during templating  */
module.exports = function(app, context) {
  var router = require('express').Router();
  //The main rendering function
  var render = function(req, res) {
    var fragment = req.query._escaped_fragment_;
    if(fragment !== undefined) {
      //Return pre-rendered html snapshot
      var opts = {root: './client/public/snapshots/'};
      var file = 'home.html';//Default snapshot file
      if(fragment) {
        file = fragment + '.html';
      }
      res.sendfile(file, opts, function(err){ console.log(err); });//TODO: log errors to file
    }
    else {
      res.render('main', context);
    }
  };
  //The view routing is done client-side
  //Here we simply direct to the main rendering function.
  //app.get('/some_api/', api.get);//Wire in your own endpoints here
  app.get('*', render);
};
