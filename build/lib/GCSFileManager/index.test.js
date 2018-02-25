'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLOUD_BUCKET = _config2.default.get('CLOUD_BUCKET');

(0, _ava2.default)('getPublicUrl', function (t) {
  var filename = 'filename.file';
  t.is('https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename, (0, _.getUrl)(filename));
});

var INPUT = {
  filename: 'filename',
  dir: 'dir/dir',
  content: 'content'
};
_ava2.default.serial.cb('upload', function (t) {
  (0, _.upload)(INPUT).then(function (url) {
    (0, _request2.default)({
      url: url,
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache'
      }
    }, function (error, response, body) {
      if (error && response.statusCode !== 200) {
        console.error(error);
        t.fail();
      } else if (body !== INPUT.content) {
        t.fail();
      } else {
        t.pass();
      }
      t.end();
    });
  }).catch(function (error) {
    console.error(error);
    t.fail();
    t.end();
  });
});
_ava2.default.serial.cb('remove', function (t) {
  var filename = INPUT.filename,
      dir = INPUT.dir;

  (0, _.remove)({ filename: filename, dir: dir }).then(function () {
    t.pass();
    t.end();
  }).catch(function (error) {
    console.error(error);
    t.fail();
    t.end();
  });
});