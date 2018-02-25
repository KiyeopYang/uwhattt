'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _traceAgent = require('@google-cloud/trace-agent');

var traceAgent = _interopRequireWildcard(_traceAgent);

var _debugAgent = require('@google-cloud/debug-agent');

var debugAgent = _interopRequireWildcard(_debugAgent);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireDefault(_logging);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _fromVisitors = require('./fromVisitors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = (0, _express2.default)();

// 배포 환경에서 추적 로그 설정
// https
if (process.env.NODE_ENV === 'production') {
  traceAgent.start();
  debugAgent.start();
  app.use(function (req, res, next) {
    if (req.secure) return next();
    return res.redirect('https://' + req.headers.host + req.url);
  });
} else {
  // ONLY FOR DEVELOPMENT
  app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
}

app.set('trust proxy', true);

// Add the request logger before anything else so that it can
// accurately log requests.
app.use(_logging2.default.requestLogger);

// 몽고디비 연결 설정
_mongoose2.default.Promise = _bluebird2.default;

var db = _mongoose2.default.connection;

var MONGO_URL = _config2.default.get('MONGO_URL');
_mongoose2.default.connect(MONGO_URL, {
  useMongoClient: true,
  reconnectTries: 100,
  reconnectInterval: 1000
});

// open 이벤트는 1회만 일어난다.
db.once('open', function () {
  _logging2.default.info('[MONGO DB URL] : ' + MONGO_URL);
});
var dbTimer = null;
db.on('disconnected', function () {
  _logging2.default.error('MongoDB Disconnected');
  dbTimer = new Date().getTime();
});
db.on('reconnected', function () {
  var elapsed = 0;
  if (dbTimer !== null) {
    elapsed = new Date().getTime() - dbTimer;
  }
  _logging2.default.info('MongoDB Reconnected, elalpsed: ' + elapsed);
  dbTimer = null;
});
db.on('error', function (error) {
  _logging2.default.error(error);
  throw error;
});

// POST 연결을 위한 설정
app.use(_bodyParser2.default.urlencoded({ extended: true, limit: '5mb' }));
app.use(_bodyParser2.default.json({ limit: '5mb' }));

// from source
app.use('/source', _fromVisitors.source);

// API
app.use('/api', _routes2.default);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(_express2.default.static(_path2.default.join(__dirname, '../../', 'client/build')));
  app.get('/*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../', 'client/build', 'index.html'));
  });
}

// Add the error logger after all middleware and routes so that
// it can log errors from the whole application. Any custom error
// handlers should go after this.
app.use(_logging2.default.errorLogger);

// Basic 404 handler
app.use(function (req, res) {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use(function (err, req, res) {
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

// Start the server
var server = app.listen(_config2.default.get('PORT'), function () {
  var _server$address = server.address(),
      port = _server$address.port;

  _logging2.default.info('App listening on port ' + port);
});

exports.default = app;