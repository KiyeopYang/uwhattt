'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, url) {
  var _this = this;

  var NAME = 'Account';
  var USER = {
    email: '_TEST@naver.com',
    password: '_TEST_TEST'
  };
  var APPLIST = [{
    app: _mongoose2.default.Types.ObjectId(),
    number: 0
  }, {
    app: _mongoose2.default.Types.ObjectId(),
    number: 1
  }];
  _ava2.default.serial('create ' + NAME, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _supertest2.default)(app).post(url).send(USER);

            case 2:
              res = _context.sent;

              t.is(res.status, 200);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  _ava2.default.serial('login ' + NAME, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
      var res, body;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _supertest2.default)(app).post(url + '/login').send(USER);

            case 2:
              res = _context2.sent;

              t.is(res.status, 200);
              body = res.body;

              t.truthy(body.id);
              USER.id = body.id;

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  _ava2.default.serial('auth ' + NAME, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
      var res, body;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _supertest2.default)(app).get(url).set('Authorization', 'Bearer ' + USER.id);

            case 2:
              res = _context3.sent;

              t.is(res.status, 200);
              body = res.body;

              t.truthy(body);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  _ava2.default.serial('auth fail ' + NAME, function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _supertest2.default)(app).get(url).set('Authorization', 'Bearer 1234');

            case 2:
              res = _context4.sent;

              t.not(res.status, 200);

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  _ava2.default.serial('change appList ' + NAME, function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _supertest2.default)(app).put(url + '/applist').set('Authorization', 'Bearer ' + USER.id).send(APPLIST);

            case 2:
              res = _context5.sent;

              t.is(res.status, 200);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
  _ava2.default.serial('remove ' + NAME, function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _supertest2.default)(app).del('' + url).set('Authorization', 'Bearer ' + USER.id);

            case 2:
              res = _context6.sent;

              t.is(res.status, 200);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());
  _ava2.default.after.always.cb('delete all test data', function (t) {
    _models.Account.deleteMany({
      email: {
        $in: [USER.email]
      }
    }, function (error) {
      if (error) {
        console.error(error);
        t.fail();
      } else {
        t.pass();
      }
      t.end();
    });
  });
};

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _models = require('../../models');

var _somethings = require('../../lib/somethings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
로그인
auth
회원가입
회원삭제
앱 업데이트
레벨
 */