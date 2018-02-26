'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfo = exports.urlExists = exports.getTitle = exports.getFavicon = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var getInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var _ref2, _ref3, favicon, title;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return urlExists(url);

          case 2:
            _context.next = 4;
            return _bluebird2.default.all([getFavicon(url), getTitle(url)]);

          case 4:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            favicon = _ref3[0];
            title = _ref3[1];
            return _context.abrupt('return', {
              favicon: favicon,
              title: title
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _favicon = require('favicon');

var _favicon2 = _interopRequireDefault(_favicon);

var _getTitleAtUrl = require('get-title-at-url');

var _getTitleAtUrl2 = _interopRequireDefault(_getTitleAtUrl);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getFavicon(url) {
  return new _bluebird2.default(function (resolve) {
    (0, _favicon2.default)(url, function (error, favicon) {
      if (error) {
        resolve();
      } else {
        resolve(favicon);
      }
    });
  });
}
function getTitle(url) {
  return new _bluebird2.default(function (resolve) {
    (0, _getTitleAtUrl2.default)(url, function (title) {
      if (!title || title === '') {
        resolve();
      } else {
        resolve(title);
      }
    });
  });
}
function urlExists(url) {
  return new _bluebird2.default(function (resolve, reject) {
    (0, _request2.default)(url, function (e, r) {
      if (e) reject(e);else resolve(r.statusCode !== 404);
    });
  });
}
exports.getFavicon = getFavicon;
exports.getTitle = getTitle;
exports.urlExists = urlExists;
exports.getInfo = getInfo;