'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  _passport2.default.authenticate('bearer', { session: false }, function (err, user) {
    var userFound = user && !Object.hasOwnProperty.call(user, 'unauthorized') && !user.unauthorized ? user : null;
    if (err) {
      return next(err);
    }
    if (!userFound) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    delete userFound.password;
    req.user = userFound;
    return next();
  })(req, res, next);
};

var _passportHttpBearer = require('passport-http-bearer');

var _passportHttpBearer2 = _interopRequireDefault(_passportHttpBearer);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _dbConnector = require('../lib/dbConnector');

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Strategy = _passportHttpBearer2.default.Strategy;

// PASSPORT SETTING

_passport2.default.use(new Strategy(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(apiKey, cb) {
    var client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.Client.findOne({ apiKey: apiKey }).lean().exec();

          case 3:
            client = _context.sent;

            if (client) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', cb(null, { unauthorized: true }));

          case 6:
            return _context.abrupt('return', cb(null, (0, _dbConnector.fromMongo)(client)));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', cb(null, { unauthorized: true }));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));