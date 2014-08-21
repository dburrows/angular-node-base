var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var debug = require('debug')('server');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

// config
// ------------------------------------------------------------

var publicDir = '../../client/build/production';
var viewsDir = '../build/production/views';

if (app.get('env') === 'production') {
  app.use(logger('tiny'));
}

if (app.get('env') === 'development') {
  debug('Running in development mode');
  // use non-optimised assets
  publicDir ='../../client/build/development';
  // use non-optimised views
  viewsDir = 'views';
  // turn off view caching in express and swig
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
  // add live reload snippet to pages
  app.use(require('connect-inject')({
    snippet: "<script>document.write('<script src=\"http://'" +
             " + (location.host || 'localhost').split(':')[0] + " +
             "':35729/livereload.js?snipver=1\"></' + 'script>')</script>"
  }));
  app.use(logger('dev'));
}
debug('Mounted public directory: ' + publicDir);


// views
// ------------------------------------------------------------

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, viewsDir));


// middleware
// ------------------------------------------------------------

app.use(favicon());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


// routes
// ------------------------------------------------------------
app.use('/', routes);
app.use('/api/users', users);
app.use(express.static(path.join(__dirname, publicDir)));


// error handlers
// ------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

app.use(function(err, req, res, next) {
  // production error handler
  // no stacktraces leaked to user
  res.status(err.status || 500);
  res.render('error', {
    error: {
      stack: 'An error has occured'
    }
  });
});


module.exports = app;
