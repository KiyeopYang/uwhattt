'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logging = require('../../lib/logging');

var _logging2 = _interopRequireDefault(_logging);

var _dbConnector = require('../../lib/dbConnector');

var _models = require('../../models');

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();
var NAME = '계정';

// 회원가입
router.post('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var PROCESS, _req$body, email, password, account, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            PROCESS = '회원 가입';
            _context.prev = 1;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 5;
            return new _models.Account({
              email: email,
              password: password
            }).save();

          case 5:
            account = _context.sent;
            result = (0, _dbConnector.fromMongo)(account.toObject());

            delete result.password;
            res.json(result);
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](1);

            _logging2.default.error(_context.t0);
            res.status(500).json({ message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC' });

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
// 로그인
router.post('/login', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var PROCESS, _req$body2, email, password, account, valid, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            PROCESS = '로그인';
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.prev = 2;
            _context2.next = 5;
            return _models.Account.findOne({
              email: email
            }).exec();

          case 5:
            account = _context2.sent;

            if (account) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uC785\uB825\uB41C \uACC4\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
            }));

          case 8:
            _context2.next = 10;
            return account.passwordIsValid(password);

          case 10:
            valid = _context2.sent;

            if (valid) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uBE44\uBC00\uBC88\uD638 \uC785\uB825\uC774 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4.'
            }));

          case 13:
            result = (0, _dbConnector.fromMongo)(account.toObject());

            delete result.password;
            return _context2.abrupt('return', res.json(result));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2['catch'](2);

            _logging2.default.error(_context2.t0);
            return _context2.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC'
            }));

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 18]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
// 인증
router.get('/', _auth2.default, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', res.json(req.user));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
// appList 업데이트
router.put('/applist', _auth2.default, function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var PROCESS;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            PROCESS = '앱 리스트 업데이트';
            _context4.prev = 1;
            _context4.next = 4;
            return _models.Account.updateOne({ _id: req.user.id }, { $set: { appList: req.body } });

          case 4:
            res.json({ success: true });
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](1);

            _logging2.default.error(_context4.t0);
            res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC'
            });

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
// 삭제
router.delete('/', _auth2.default, function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var PROCESS;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            PROCESS = '삭제';
            _context5.prev = 1;
            _context5.next = 4;
            return _models.Account.deleteOne({ _id: req.user.id });

          case 4:
            res.json({ success: true });
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](1);

            _logging2.default.error(_context5.t0);
            res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC'
            });

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 7]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
exports.default = router;