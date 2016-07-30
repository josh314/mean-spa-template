//Define & export app
var express = require('express');
var app = express();

//Utility modules
var path = require('path');

//Favicon middleware. Keep these lines commented out if you have no favicon file or app will not start.
//var favicon = require('serve-favicon');
//app.use(favicon('client/public/img/favicons/my.ico'));

// views setup
var viewsPath = 'server/handlebars';
var partialsPath = viewsPath + '/partials';
var layoutsPath = viewsPath + '/layouts';
var hbs = require('express-handlebars').create({
  extname: '.hbs',
  defaultLayout:path.resolve(layoutsPath + '/index'),
  partialsDir: path.resolve(partialsPath)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(viewsPath));

//Logging
var morgan = require('morgan');
if(app.get('env') === 'production') {
  app.use(morgan());
}
else {
  app.use(morgan('dev'));
}

//Cookies & session middleware - Used for flash message
var credentials = require('./credentials');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(require('express-session')({
  resave: true,
  saveUninitialized: true,
  secret: credentials.cookieSecret,
  store: new MongoStore({ttl:600, db: 'jdninja'}),
}));
//Static server
app.use(express.static(path.resolve('client/public')));

// Uncomment to test error handling
/*
app.use(function(req,res,next) {
    var err = new Error('Demo error');
    err.status=42;
    throw err;
});
*//*
// flash message middleware
app.use(function(req, res, next){
  // if there's a flash message, transfer
  // it to the context, then clear it
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});
*/

var config = require('./config/home-data');
//Define layout
var layout = {};
layout.title = config.title;
layout.description = config.description;
if(app.get('env') === 'production') {
  layout.scripts = config.prod.scripts;
  layout.stylesheets = config.prod.stylesheets;
}
else {
  layout.scripts = config.dev.scripts;
  layout.stylesheets = config.dev.stylesheets;
}

//Create an express router using layout as configuration
var router = require('./routes')(app,layout);

//If route is not handled, render custom 404 page
app.use(function(req, res, next) {
  res.render('404', layout);
});

/// error handlers

//TODO:Detailed logging on an error. Log to file.

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var context = {};
    for(var i in layout) {
        if(layout.hasOwnProperty(i)) {
            context[i] = layout[i];
        }
    }
    context.message = err.message;
    context.error = err;
    res.status(err.status || 500);
    res.render('error', context);
  });
}

// production error handler
// Renders user error page
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.status(500);
    res.render('500', layout );
  });
}


module.exports = app;
