var nunjucks     = require('nunjucks');
var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var session      = require('express-session');
var fs           = require('fs');
var passportInfo = require('./config/passport-info.js');
var configDB     = require('./config/database.js');
var debug        = require('debug')('kevinferri.com');

// Set default environment to dev if not specified otherwise
var env = process.env.NODE_ENV || 'development';

// Connect to db
mongoose.connect(configDB[env]);

// Initialize express
var app = express();

// Use passport for authentication
require('./config/passport')(passport);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Required for passport
app.use(session({ secret: passportInfo.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions
app.use(flash()); // Use connect-flash for flash messages stored in session

// Require routes
var routes = require('./routes.js')(app, passport);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
if (env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

console.log('Server started on port ' + app.get('port'));

module.exports = app;