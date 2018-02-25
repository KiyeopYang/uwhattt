'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _loggingWinston = require('@google-cloud/logging-winston');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorize = process.env.NODE_ENV !== 'production';
var loggingWinston = new _loggingWinston.LoggingWinston();

// Logger to capture all requests and output them to the console.
var requestLogger = _expressWinston2.default.logger({
  transports: [loggingWinston, new _winston2.default.transports.Console({
    json: false,
    colorize: colorize
  })],
  expressFormat: true,
  meta: false
});

// Logger to capture any top-level errors and output json diagnostic info.
var errorLogger = _expressWinston2.default.errorLogger({
  transports: [loggingWinston, new _winston2.default.transports.Console({
    json: true,
    colorize: colorize
  })]
});

exports.default = {
  requestLogger: requestLogger,
  errorLogger: errorLogger,
  error: _winston2.default.error,
  warn: _winston2.default.warn,
  info: _winston2.default.info,
  log: _winston2.default.log,
  verbose: _winston2.default.verbose,
  debug: _winston2.default.debug,
  silly: _winston2.default.silly
};