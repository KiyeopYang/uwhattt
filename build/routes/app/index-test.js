'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, url) {
  var _this = this;

  var NAME = 'App';
  var APP = {
    domain: 'https://mamre.kr'
  };
  _ava2.default.serial('get info ' + NAME, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
      var res, body, favicon, title;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _supertest2.default)(app).get(url + '/' + encodeURIComponent(APP.domain));

            case 2:
              res = _context.sent;

              t.is(res.status, 200);
              body = res.body;
              favicon = body.favicon, title = body.title;

              t.truthy(favicon);
              t.truthy(title);
              APP.favicon = favicon;
              APP.title = title;

            case 10:
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
  _ava2.default.serial('create ' + NAME, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
      var res, body;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _supertest2.default)(app).post(url).send(APP);

            case 2:
              res = _context2.sent;

              t.is(res.status, 200);
              body = res.body;

              APP.id = body.id;

            case 6:
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
  _ava2.default.serial('remove ' + NAME, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _supertest2.default)(app).del(url + '/' + APP.id);

            case 2:
              res = _context3.sent;

              t.is(res.status, 200);

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
  _ava2.default.after.always.cb('delete all test data', function (t) {
    _models.App.deleteMany({
      domain: {
        $in: [APP.domain]
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
정보 획득
생성
삭제
 */