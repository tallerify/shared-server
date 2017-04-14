/**
 * Load env file
 */
require('dotenv').config();

// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('./utils/logger');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');


// *** routes *** //
var routes = require('./routes/index.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, '../dist'));
app.use(express.static(path.join(__dirname, '../dist')));

// *** config middleware *** //
app.use(cors());
app.use(require('morgan')('combined', { 'stream': logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// *** main routes *** //
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development and test error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'test') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('index', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('index', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
