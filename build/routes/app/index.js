'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _GCSFileManager = require('../../lib/GCSFileManager');

var _logging = require('../../lib/logging');

var _logging2 = _interopRequireDefault(_logging);

var _generateKey = require('../../lib/generateKey');

var _generateKey2 = _interopRequireDefault(_generateKey);

var _dbConnector = require('../../lib/dbConnector');

var _appInfo = require('../../lib/appInfo');

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var multer = (0, _multer2.default)({
  storage: _multer2.default.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});
var router = _express2.default.Router();
var NAME = '앱';

router.get('/info/:url', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var PROCESS, baseUrl, url, httpsIncluded, httpIncluded, isHttps, info, _info, favicon, title, URL;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            PROCESS = '정보 조회';
            baseUrl = req.params.url;
            url = decodeURIComponent(baseUrl);
            httpsIncluded = url.includes('https://');
            httpIncluded = url.includes('http://');
            _context2.prev = 5;
            isHttps = httpsIncluded;
            info = void 0;

            if (!(!httpsIncluded && !httpIncluded)) {
              _context2.next = 25;
              break;
            }

            _context2.prev = 9;

            url = 'https://' + baseUrl;
            _context2.next = 13;
            return (0, _appInfo.getInfo)(url);

          case 13:
            info = _context2.sent;

            isHttps = true;
            _context2.next = 23;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2['catch'](9);

            url = 'http://' + baseUrl;
            _context2.next = 22;
            return (0, _appInfo.getInfo)(url);

          case 22:
            info = _context2.sent;

          case 23:
            _context2.next = 28;
            break;

          case 25:
            _context2.next = 27;
            return (0, _appInfo.getInfo)(url);

          case 27:
            info = _context2.sent;

          case 28:
            if (info) {
              _context2.next = 31;
              break;
            }

            _logging2.default.error(error);
            return _context2.abrupt('return', res.status(500).json({ message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC' }));

          case 31:
            _info = info, favicon = _info.favicon, title = _info.title;
            URL = new _urlParse2.default(url);


            _request2.default.defaults({ encoding: null }).get(favicon, function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, r, body) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        res.json({
                          url: url,
                          title: title,
                          isHttps: isHttps,
                          domain: URL.hostname,
                          path: URL.pathname,
                          favicon: {
                            url: encodeURIComponent(favicon),
                            buffer: body
                          }
                        });

                      case 1:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3, _x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 40;
            break;

          case 36:
            _context2.prev = 36;
            _context2.t1 = _context2['catch'](5);

            _logging2.default.error(_context2.t1);
            return _context2.abrupt('return', res.status(500).json({ message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC' }));

          case 40:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 36], [9, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
// 추가
// router.post(
//   '/',
//   async (req, res) => {
//     const PROCESS = '추가';
//     try {
//       const {
//         favicon,
//         title,
//         isHttps,
//         domain,
//         path,
//       } = req.body;
//       let app = await new App({
//         title,
//         isHttps,
//         domain,
//         path,
//       }).save();
//       app = app.toObject();
//       if (!favicon) {
//         request.defaults({ encoding: null }).get(
//           favicon, async function (err, r, body) {
//             try {
//               const url = await upload({
//                 filename: `${keyGen()}${pathLib.extname(favicon) || '.jpg'}`,
//                 dir: 'favicon',
//                 content: body,
//               });
//               await App.updateOne({
//                 $set: { favicon: url },
//               }).save();
//               app.favicon = url;
//               res.json(fromMongo(app));
//             } catch (error) {
//               logging.error(error);
//               res.status(500).json({ message: `에러: 이미지가 정상적으로 업로드 되지 않았습니다.` });
//             }
//           });
//       } else {
//         res.json(fromMongo(app));
//       }
//     } catch (error) {
//       logging.error(error);
//       res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
//     }
//   },
// );
// 추가(파일)
router.post('/', multer.single('file'), function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var PROCESS, file, body, _JSON$parse, title, isHttps, domain, path, url, app;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            PROCESS = '추가';
            _context3.prev = 1;
            file = req.file, body = req.body;
            _JSON$parse = JSON.parse(body.data), title = _JSON$parse.title, isHttps = _JSON$parse.isHttps, domain = _JSON$parse.domain, path = _JSON$parse.path;
            url = void 0;

            if (!file) {
              _context3.next = 9;
              break;
            }

            _context3.next = 8;
            return (0, _GCSFileManager.upload)({
              filename: '' + (0, _generateKey2.default)() + _path2.default.extname(file.originalname),
              dir: 'favicon',
              content: file.buffer
            });

          case 8:
            url = _context3.sent;

          case 9:
            _context3.next = 11;
            return new _models.App({
              favicon: file ? url : undefined,
              title: title,
              isHttps: isHttps,
              domain: domain,
              path: path
            }).save();

          case 11:
            app = _context3.sent;

            res.json((0, _dbConnector.fromMongo)(app.toObject()));
            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3['catch'](1);

            _logging2.default.error(_context3.t0);
            res.status(500).json({ message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC' });

          case 19:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 15]]);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
// 수정
router.post('/', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var PROCESS, _req$body, favicon, title, isHttps, domain, path, app;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            PROCESS = '추가';
            _context5.prev = 1;
            _req$body = req.body, favicon = _req$body.favicon, title = _req$body.title, isHttps = _req$body.isHttps, domain = _req$body.domain, path = _req$body.path;

            if (favicon) {
              _context5.next = 10;
              break;
            }

            _context5.next = 6;
            return new _models.App({
              favicon: favicon,
              title: title,
              isHttps: isHttps,
              domain: domain,
              path: path
            }).save();

          case 6:
            app = _context5.sent;

            res.json((0, _dbConnector.fromMongo)(app.toObject()));
            _context5.next = 11;
            break;

          case 10:
            _request2.default.defaults({ encoding: null }).get(favicon, function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err, res, body) {
                var url, app;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return (0, _GCSFileManager.upload)({
                          filename: '' + (0, _generateKey2.default)() + (_path2.default.extname(favicon) || '.jpg'),
                          dir: 'favicon',
                          content: body
                        });

                      case 2:
                        url = _context4.sent;
                        _context4.next = 5;
                        return new _models.App({
                          favicon: url,
                          title: title,
                          isHttps: isHttps,
                          domain: domain,
                          path: path
                        }).save();

                      case 5:
                        app = _context4.sent;

                        res.json((0, _dbConnector.fromMongo)(app.toObject()));

                      case 7:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, this);
              }));

              return function (_x10, _x11, _x12) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 11:
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5['catch'](1);

            _logging2.default.error(_context5.t0);
            res.status(500).json({ message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC' });

          case 17:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 13]]);
  }));

  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/:id', function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var PROCESS, id, app;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            PROCESS = '조회';
            _context6.prev = 1;
            id = req.params.id;
            _context6.next = 5;
            return _models.App.findOne({ _id: id }).lean().exec();

          case 5:
            app = _context6.sent;

            res.json((0, _dbConnector.fromMongo)(app));
            _context6.next = 13;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6['catch'](1);

            _logging2.default.error(_context6.t0);
            res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC'
            });

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[1, 9]]);
  }));

  return function (_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());
router.post('/getAppList', function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var PROCESS, body, appList;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            PROCESS = '조회';
            _context7.prev = 1;
            body = req.body;
            _context7.next = 5;
            return _models.App.find({ _id: { $in: body } }).lean().exec();

          case 5:
            appList = _context7.sent;

            res.json((0, _dbConnector.fromMongo)(body.map(function (id) {
              return appList.find(function (o) {
                return String(o._id) === id;
              });
            })));
            _context7.next = 13;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7['catch'](1);

            _logging2.default.error(_context7.t0);
            res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC'
            });

          case 13:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 9]]);
  }));

  return function (_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}());
router.get('/', function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var PROCESS, appList;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            PROCESS = '조회';
            _context8.prev = 1;
            _context8.next = 4;
            return _models.App.find({}).lean().exec();

          case 4:
            appList = _context8.sent;

            res.json((0, _dbConnector.fromMongo)(appList));
            _context8.next = 12;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8['catch'](1);

            _logging2.default.error(_context8.t0);
            res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC'
            });

          case 12:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[1, 8]]);
  }));

  return function (_x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}());

// 삭제
router.delete('/:id', function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var PROCESS, id;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            PROCESS = '삭제';
            id = req.params.id;
            _context9.prev = 2;
            _context9.next = 5;
            return _models.App.deleteOne({ _id: id });

          case 5:
            res.json({ success: true });
            _context9.next = 12;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9['catch'](2);

            _logging2.default.error(_context9.t0);
            res.status(400).json({
              message: NAME + ' ' + PROCESS + ' \uC5D0\uB7EC'
            });

          case 12:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[2, 8]]);
  }));

  return function (_x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}());
exports.default = router;