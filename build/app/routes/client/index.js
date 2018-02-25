'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logging = require('../../../lib/logging');

var _logging2 = _interopRequireDefault(_logging);

var _dbConnector = require('../../../lib/dbConnector');

var _models = require('../../../models');

var _website = require('../../lib/website');

var websiteLib = _interopRequireWildcard(_website);

var _sendEmail = require('../../lib/sendEmail');

var _sendEmail2 = _interopRequireDefault(_sendEmail);

var _generateKey = require('../../../lib/generateKey');

var _generateKey2 = _interopRequireDefault(_generateKey);

var _auth = require('../../auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();
var NAME = '계정';

// 회원가입
router.post('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var PROCESS, _req$body, email, password, phone, https, domain, clientFound, websiteFound, message, client;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            PROCESS = '회원 가입';
            _context.prev = 1;
            _req$body = req.body, email = _req$body.email, password = _req$body.password, phone = _req$body.phone, https = _req$body.https, domain = _req$body.domain;
            _context.next = 5;
            return _models.Client.findOne({ email: email }).exec();

          case 5:
            clientFound = _context.sent;
            _context.next = 8;
            return _models.Website.findOne({
              domain: domain,
              https: https
            }).exec();

          case 8:
            websiteFound = _context.sent;

            if (clientFound || websiteFound) {
              message = void 0;

              if (clientFound) {
                message = NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uC774\uBBF8 \uC774\uBA54\uC77C\uC774 \uC874\uC7AC\uD569\uB2C8\uB2E4.';
              } else {
                message = NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uC774\uBBF8 \uB3C4\uBA54\uC778\uC774 \uC874\uC7AC\uD569\uB2C8\uB2E4.';
              }
              res.status(500).json({ message: message });
            }
            _context.next = 12;
            return new _models.Client({
              email: email,
              password: password,
              phone: phone
            }).save();

          case 12:
            client = _context.sent;

            client = (0, _dbConnector.fromMongo)(client.toObject());
            _context.next = 16;
            return websiteLib.make({
              client: client.id,
              domain: domain,
              https: https
            });

          case 16:
            res.json({
              apiKey: client.apiKey,
              success: true
            });
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](1);

            _logging2.default.error(_context.t0);
            res.status(500).json({ message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC' });

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 19]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
// 로그인
router.post('/login', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var PROCESS, _req$body2, email, password, client, valid;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            PROCESS = '로그인';
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 4;
            return _models.Client.findOne({
              email: email
            }).exec();

          case 4:
            client = _context2.sent;

            if (client) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uC785\uB825\uB41C \uACC4\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
            }));

          case 7:
            _context2.next = 9;
            return client.passwordIsValid(password);

          case 9:
            valid = _context2.sent;

            if (valid) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uBE44\uBC00\uBC88\uD638 \uC785\uB825\uC774 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4.'
            }));

          case 12:
            return _context2.abrupt('return', res.json({
              apiKey: client.apiKey,
              success: true
            }));

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
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
            return _context3.abrupt('return', res.json({
              success: true,
              client: req.user
            }));

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
// 삭제 요청
router.post('/remove', _auth2.default, function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var PROCESS;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            PROCESS = '삭제';

            if (req.user) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uACC4\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
            }));

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return _models.Client.updateOne({
              _id: req.user.id
            }, {
              $set: { requestForRemove: new Date() }
            });

          case 6:
            _context4.next = 8;
            return (0, _sendEmail2.default)({
              to: req.user.email,
              title: '계정 삭제 요청 완료',
              html: '<div><p>14일 내에 삭제 요청을 취소하시려면 로그인 후, 계정 정보에서 취소하십시요.</p><hr /><a href=\'webpush.kr\'>webpush.kr</a></div>'
            });

          case 8:
            return _context4.abrupt('return', res.json({
              success: true
            }));

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](3);

            _logging2.default.error(_context4.t0);
            return _context4.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uC0AD\uC81C\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
            }));

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[3, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
// 삭제 요청 취소
router.post('/remove/cancel', _auth2.default, function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var PROCESS;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            PROCESS = '삭제 취소';

            if (req.user) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uACC4\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
            }));

          case 3:
            _context5.prev = 3;
            _context5.next = 6;
            return _models.Client.updateOne({
              _id: req.user.id
            }, {
              $unset: { requestForRemove: '' }
            });

          case 6:
            return _context5.abrupt('return', res.json({
              success: true
            }));

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5['catch'](3);

            _logging2.default.error(_context5.t0);
            return _context5.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uC0AD\uC81C\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
            }));

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[3, 9]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
// 삭제 (실사용 아직)
router.delete('/', _auth2.default, function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var PROCESS;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            PROCESS = '삭제';

            if (req.user) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uACC4\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
            }));

          case 3:
            _context6.prev = 3;
            _context6.next = 6;
            return _models.Client.deleteOne({
              _id: req.user.id
            });

          case 6:
            return _context6.abrupt('return', res.json({
              success: true
            }));

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6['catch'](3);

            _logging2.default.error(_context6.t0);
            return _context6.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uC0AD\uC81C\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
            }));

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[3, 9]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.post('/changePassword', _auth2.default, function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var PROCESS, _req$body3, next, token, id, client;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            PROCESS = '정보 변경';
            _req$body3 = req.body, next = _req$body3.next, token = _req$body3.token;
            id = req.user.id;
            _context7.next = 5;
            return _models.Client.findOne({
              _id: id,
              passwordChangeToken: token
            }).exec();

          case 5:
            client = _context7.sent;

            if (client) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uB9CC\uB8CC\uB41C \uD1A0\uD070\uC785\uB2C8\uB2E4.'
            }));

          case 8:
            _context7.prev = 8;
            _context7.next = 11;
            return _models.Client.updateOne({ _id: id }, {
              $set: { password: next },
              $unset: { passwordChangeToken: '' }
            });

          case 11:
            return _context7.abrupt('return', res.json({
              success: true
            }));

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7['catch'](8);

            _logging2.default.error(_context7.t0);
            return _context7.abrupt('return', res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC : \uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
            }));

          case 18:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[8, 14]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.get('/password/:token', function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var token, client, secure, postfix, redirectURL;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            token = req.params.token;
            _context8.next = 3;
            return _models.Client.findOne({ passwordChangeToken: token }).exec();

          case 3:
            client = _context8.sent;

            if (!client) {
              _context8.next = 10;
              break;
            }

            res.cookie('apiKey', client.apiKey);
            secure = req.secure ? 'https://' : 'http://';
            postfix = process.env.NODE_ENV === 'production' ? '' : ':3000';
            redirectURL = '' + secure + req.hostname + postfix + '/account/' + token;
            return _context8.abrupt('return', res.redirect(redirectURL));

          case 10:
            return _context8.abrupt('return', res.status(400).json({ message: '연결된 계정이 없거나 토큰이 만료되었습니다.' }));

          case 11:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.post('/password', function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var email, client, key, secure, postfix, link;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            email = req.body.email;
            _context9.next = 3;
            return _models.Client.findOne({ email: email }).exec();

          case 3:
            client = _context9.sent;

            if (!client) {
              _context9.next = 21;
              break;
            }

            key = (0, _generateKey2.default)();
            _context9.prev = 6;
            _context9.next = 9;
            return _models.Client.updateOne({
              _id: client._id
            }, {
              $set: {
                passwordChangeToken: key
              }
            });

          case 9:
            secure = req.secure ? 'https://' : 'http://';
            postfix = process.env.NODE_ENV === 'production' ? '' : ':8080';
            link = '' + secure + req.hostname + postfix + '/api/client/password/' + key;
            _context9.next = 14;
            return (0, _sendEmail2.default)({
              to: email,
              title: '비밀번호 찾기 결과입니다.',
              html: '<div><p>\uB9C1\uD06C\uB97C \uD074\uB9AD\uD558\uC5EC \uBE44\uBC00\uBC88\uD638\uB97C \uC218\uC815\uD558\uC2ED\uC2DC\uC694.</p><hr /><a href=\'' + link + '\'>' + link + '</a></div>'
            });

          case 14:
            return _context9.abrupt('return', res.json({ success: true }));

          case 17:
            _context9.prev = 17;
            _context9.t0 = _context9['catch'](6);

            _logging2.default.error(_context9.t0);
            return _context9.abrupt('return', res.status(500).json({ message: '에러가 있습니다.' }));

          case 21:
            return _context9.abrupt('return', res.status(400).json({ message: '잘못된 이메일입니다.' }));

          case 22:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[6, 17]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
exports.default = router;