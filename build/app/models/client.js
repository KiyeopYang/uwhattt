'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _generateKey = require('../lib/generateKey');

var _generateKey2 = _interopRequireDefault(_generateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bcrypt = _bluebird2.default.promisifyAll(_bcrypt2.default);
var Schema = _mongoose2.default.Schema;

var Client = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  apiKey: {
    type: String,
    required: true,
    default: (0, _generateKey2.default)()
  },
  phone: {
    type: String
  },
  passwordChangeToken: {
    type: String
  },
  requestForRemove: {
    type: Date
  }
});
Client.pre('save', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (this.isModified('password')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', next());

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return bcrypt.hash(this.password, 10);

          case 5:
            this.password = _context.sent;
            return _context.abrupt('return', next());

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](2);
            return _context.abrupt('return', next(_context.t0));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 9]]);
  }));

  function hashing(_x) {
    return _ref.apply(this, arguments);
  }

  return hashing;
}());
Client.pre('updateOne', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(next) {
    var u, update, prevPassword;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            u = this.getUpdate();
            update = u.$set;

            if (!(update && update.password)) {
              _context2.next = 15;
              break;
            }

            _context2.prev = 3;
            prevPassword = update.password;

            delete update.password;
            _context2.next = 8;
            return bcrypt.hash(prevPassword, 10);

          case 8:
            update.password = _context2.sent;

            u.$set = update;
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](3);
            return _context2.abrupt('return', next(_context2.t0));

          case 15:
            this.update({}, u);
            return _context2.abrupt('return', next());

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 12]]);
  }));

  function hashing(_x2) {
    return _ref2.apply(this, arguments);
  }

  return hashing;
}());
Client.methods.passwordIsValid = function passwordIsValid(password) {
  try {
    return bcrypt.compareAsync(password, this.password);
  } catch (err) {
    throw err;
  }
};
var model = _mongoose2.default.model('client', Client);

exports.default = model;