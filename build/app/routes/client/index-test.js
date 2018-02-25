'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, url) {
  var _this = this;

  var NAME = 'Client';
  var INPUT = {
    email: 'testwebpush@gmail.com',
    password: 'abcdefghi',
    https: false,
    phone: '010464570842',
    domain: 'webpush.kr2'
  };
  var SAVED_INPUT = {};
  _ava2.default.serial('create ' + NAME, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
      var res, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _supertest2.default)(app).post(url).send(INPUT);

            case 2:
              res = _context.sent;

              t.is(res.status, 200);
              body = res.body;

              t.true(body.success);
              t.true(hasProperty(body, 'apiKey'));
              SAVED_INPUT.apiKey = body.apiKey;

            case 8:
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
              return (0, _supertest2.default)(app).post(url + '/login').send({
                email: INPUT.email,
                password: INPUT.password
              });

            case 2:
              res = _context2.sent;

              t.is(res.status, 200);
              body = res.body;

              t.true(body.success);
              t.true(hasProperty(body, 'apiKey'));

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
  _ava2.default.serial('login Fail ' + NAME, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _supertest2.default)(app).post(url + '/login').send({
                email: INPUT.email,
                password: 'failPassword'
              });

            case 2:
              res = _context3.sent;

              t.is(res.status, 400);

            case 4:
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
  _ava2.default.serial('get(auth) ' + NAME, function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(t) {
      var _SAVED_INPUT, apiKey, res, body;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _SAVED_INPUT = SAVED_INPUT, apiKey = _SAVED_INPUT.apiKey;
              _context4.next = 3;
              return (0, _supertest2.default)(app).get(url).set('Authorization', 'Bearer ' + apiKey);

            case 3:
              res = _context4.sent;

              t.is(res.status, 200);
              body = res.body;

              t.true(body.success);
              t.true(hasProperty(body, 'client'));
              SAVED_INPUT = body.client;

            case 9:
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
  _ava2.default.serial('get(auth) (failure) ' + NAME, function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _supertest2.default)(app).get(url).set('Authorization', 'Bearer testtest');

            case 2:
              res = _context5.sent;

              t.is(res.status, 401);

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
  _ava2.default.serial('changePassword ' + NAME, function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(t) {
      var _SAVED_INPUT2, apiKey, res, body;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _SAVED_INPUT2 = SAVED_INPUT, apiKey = _SAVED_INPUT2.apiKey;
              _context6.next = 3;
              return (0, _supertest2.default)(app).post(url + '/changePassword').set('Authorization', 'Bearer ' + apiKey).send({
                next: 'abababab'
              });

            case 3:
              res = _context6.sent;

              t.is(res.status, 200);
              body = res.body;

              t.true(body.success);

            case 7:
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
  _ava2.default.serial('get password request ' + NAME, function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return (0, _supertest2.default)(app).post(url + '/password').send({
                email: INPUT.email
              });

            case 2:
              res = _context7.sent;

              t.is(res.status, 200);

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());
  _ava2.default.serial('get password request (failure) ' + NAME, function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _supertest2.default)(app).post(url + '/password').send({
                email: 'failure'
              });

            case 2:
              res = _context8.sent;

              t.not(res.status, 200);

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }));

    return function (_x8) {
      return _ref8.apply(this, arguments);
    };
  }());
  _ava2.default.serial('remove request ' + NAME, function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(t) {
      var _SAVED_INPUT3, apiKey, res;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _SAVED_INPUT3 = SAVED_INPUT, apiKey = _SAVED_INPUT3.apiKey;
              _context9.next = 3;
              return (0, _supertest2.default)(app).post(url + '/remove').set('Authorization', 'Bearer ' + apiKey);

            case 3:
              res = _context9.sent;

              t.is(res.status, 200);

            case 5:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this);
    }));

    return function (_x9) {
      return _ref9.apply(this, arguments);
    };
  }());
  _ava2.default.serial('cancel remove request ' + NAME, function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(t) {
      var _SAVED_INPUT4, apiKey, res;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _SAVED_INPUT4 = SAVED_INPUT, apiKey = _SAVED_INPUT4.apiKey;
              _context10.next = 3;
              return (0, _supertest2.default)(app).post(url + '/remove/cancel').set('Authorization', 'Bearer ' + apiKey);

            case 3:
              res = _context10.sent;

              t.is(res.status, 200);

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this);
    }));

    return function (_x10) {
      return _ref10.apply(this, arguments);
    };
  }());
  _ava2.default.serial('delete ' + NAME, function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(t) {
      var _SAVED_INPUT5, apiKey, res;

      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _SAVED_INPUT5 = SAVED_INPUT, apiKey = _SAVED_INPUT5.apiKey;
              _context11.next = 3;
              return (0, _supertest2.default)(app).del('' + url).set('Authorization', 'Bearer ' + apiKey);

            case 3:
              res = _context11.sent;

              t.is(res.status, 200);

            case 5:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, _this);
    }));

    return function (_x11) {
      return _ref11.apply(this, arguments);
    };
  }());
  _ava2.default.after.always.cb('delete all test data', function (t) {
    _models.Client.deleteMany({
      email: {
        $in: [INPUT.email]
      }
    }, function (error) {
      if (error) {
        console.error(error);
        t.fail();
      } else {
        t.pass();
      }
      _models.Website.deleteMany({
        client: {
          $in: [SAVED_INPUT.id]
        }
      }, function (error) {
        if (error) {
          console.error(error);
          t.fail();
        } else {
          t.pass();
          t.end();
        }
      });
    });
  });
};

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _models = require('../../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
로그인
auth
회원가입
회원삭제
 */

function hasProperty(obj, prop) {
  return Object.hasOwnProperty.call(obj, prop);
}
function isSameId(id1, id2) {
  return String(id1) === String(id2);
}