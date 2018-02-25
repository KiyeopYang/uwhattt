'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _GCSFileManager = require('../../lib/GCSFileManager');

var _webpush = require('../../lib/webpush');

var _webpush2 = _interopRequireDefault(_webpush);

var _logging = require('../../../lib/logging');

var _logging2 = _interopRequireDefault(_logging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var makeId = function makeId() {
  return _mongoose2.default.Types.ObjectId();
};
var multer = (0, _multer2.default)({
  storage: _multer2.default.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});

var NAME = '웹 푸시';
// 없앨 것
router.post('/example', multer.single('icon'), function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  var file = req.file;

  if (file) {
    // header is multipart(formdata)
    // need to be parsed to json
    var parsed = JSON.parse(req.body.dataForPush);
    (0, _GCSFileManager.upload)({
      filename: '' + makeId() + _path2.default.extname(file.originalname),
      dir: 'icons',
      content: file.buffer
    }).then(function (url) {
      parsed.push.icon = url;
      (0, _webpush2.default)(parsed).then(function () {
        return res.json({ success: true });
      }).catch(function (error) {
        _logging2.default.error(error);
        res.json({ success: false });
      });
    });
  } else {
    // header is json
    var data = req.body;
    data.icon = data.iconUrl;
    (0, _webpush2.default)(data).then(function () {
      return res.json({ success: true });
    }).catch(function (error) {
      _logging2.default.error(error);
      res.json({ success: false });
    });
  }
});

router.post('/testWithoutFile', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  var _req$body = req.body,
      subscription = _req$body.subscription,
      push = _req$body.push;

  push.icon = push.iconUrl;
  (0, _webpush2.default)({
    subscription: subscription,
    push: push
  }).then(function () {
    return res.json({ success: true });
  }).catch(function (error) {
    _logging2.default.error(error);
    res.json({ success: false });
  });
});
router.post('/testWithFile', multer.single('icon'), function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  var file = req.file;

  if (file) {
    // header is multipart(formdata)
    // need to be parsed to json
    var _req$body2 = req.body,
        subscription = _req$body2.subscription,
        push = _req$body2.push;

    subscription = JSON.parse(subscription);
    push = JSON.parse(push);
    (0, _GCSFileManager.upload)({
      filename: '' + makeId() + _path2.default.extname(file.originalname),
      dir: 'icons',
      content: file.buffer
    }).then(function (url) {
      push.icon = url;
      (0, _webpush2.default)({
        subscription: subscription,
        push: push
      }).then(function () {
        return res.json({ success: true });
      }).catch(function (error) {
        _logging2.default.error(error);
        res.json({ success: false });
      });
    });
  } else {
    res.status(500).json({
      message: NAME + ' \uC804\uC1A1 - \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.'
    });
  }
});
var WELCOME = [];
// 읽기
router.post('/welcome/load', function (req, res) {
  var websiteId = req.body.websiteId;

  if (_validator2.default.isMongoId(websiteId)) {
    var found = WELCOME.find(function (o) {
      return o.websiteId === websiteId;
    });
    if (found) {
      res.json(found.dataForPush);
    } else {
      res.status(203).json(null);
    }
  } else {
    res.status(500).json({
      message: NAME + ' \uC870\uD68C - \uC870\uD68C\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
    });
  }
});
// 읽기
router.post('/welcome/save', multer.single('icon'), function (req, res) {
  var file = req.file;

  var parsed = JSON.parse(req.body.data);
  var websiteId = parsed.websiteId,
      dataForPush = parsed.dataForPush;

  if (_validator2.default.isMongoId(websiteId)) {
    new _bluebird2.default(function (resolve, reject) {
      if (file) {
        (0, _GCSFileManager.upload)({
          filename: '' + makeId() + _path2.default.extname(file.originalname),
          dir: 'icons',
          content: file.buffer
        }).then(function (url) {
          resolve(url);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        resolve(null);
      }
    }).then(function (url) {
      if (url) {
        dataForPush.iconUrl = url;
      }
      var found = WELCOME.find(function (o) {
        return o.websiteId === websiteId;
      });
      if (found) {
        found.dataForPush = dataForPush;
      } else {
        WELCOME.push({
          websiteId: websiteId,
          dataForPush: dataForPush
        });
      }
      res.json({ success: true });
    }).catch(function (error) {
      _logging2.default.error(error);
      res.status(500).json({
        message: NAME + ' \uC800\uC7A5 - \uC800\uC7A5\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
      });
    });
  } else {
    res.status(500).json({
      message: NAME + ' \uC800\uC7A5 - \uC800\uC7A5\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
    });
  }
});
// 리스트 불러오기
router.get('/welcome', function (req, res) {
  res.json(WELCOME);
});
// 한 건 삭제
router.post('/welcome/remove', function (req, res) {
  var websiteId = req.body.websiteId;

  if (_validator2.default.isMongoId(websiteId)) {
    var found = WELCOME.findIndex(function (o) {
      return o.websiteId === websiteId;
    });
    if (found > -1) {
      WELCOME.splice(found, 1);
    }
    console.log(WELCOME);
    res.json({ success: true });
  } else {
    res.status(500).json({
      message: NAME + ' \uC0AD\uC81C - \uC0AD\uC81C\uC5D0 \uC5D0\uB7EC\uAC00 \uC788\uC2B5\uB2C8\uB2E4.'
    });
  }
});

exports.default = router;