import winston from 'winston';
import expressWinston from 'express-winston';
import {LoggingWinston} from '@google-cloud/logging-winston';

const colorize = process.env.NODE_ENV !== 'production';
const loggingWinston = new LoggingWinston();

// Logger to capture all requests and output them to the console.
const requestLogger = expressWinston.logger({
  transports: [
    loggingWinston,
    new winston.transports.Console({
      json: false,
      colorize,
    })
  ],
  expressFormat: true,
  meta: false
});

// Logger to capture any top-level errors and output json diagnostic info.
const errorLogger = expressWinston.errorLogger({
  transports: [
    loggingWinston,
    new winston.transports.Console({
      json: true,
      colorize,
    }),
  ],
});

export default {
  requestLogger,
  errorLogger,
  error: winston.error,
  warn: winston.warn,
  info: winston.info,
  log: winston.log,
  verbose: winston.verbose,
  debug: winston.debug,
  silly: winston.silly,
};
