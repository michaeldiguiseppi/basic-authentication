// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var cookieSession = require('cookie-session');


// *** routes *** //
var routes = require('./routes/index.js');
var authRoutes = require('./routes/auth.js');
var cookieRoutes = require('./routes/cookies.js');
var encryptionRoutes = require('./routes/encryption.js');
var sessionRoutes = require('./routes/sessions.js');


// *** express instance *** //
var app = express();
require('dotenv').config();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('\xfd#\xa1\x82#\x1c^t\x8a\xc1\x1e\x83:\xdc\x1b ,\x86}\x96\xf4\xfd\xc3\x15'));
app.use(cookieSession({
  name: 'mikesSession',
  keys: ['key1', 'key2', 'key3']
}));
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/cookies', cookieRoutes);
app.use('/encryption', encryptionRoutes);
app.use('/sessions', sessionRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
