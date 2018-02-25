'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _website = require('./website');

var _website2 = _interopRequireDefault(_website);

var _webpush = require('./webpush');

var _webpush2 = _interopRequireDefault(_webpush);

var _contact = require('./contact');

var _contact2 = _interopRequireDefault(_contact);

var _result = require('./result');

var _result2 = _interopRequireDefault(_result);

var _reserved = require('./reserved');

var _reserved2 = _interopRequireDefault(_reserved);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/website', _website2.default);
router.use('/webpush', _webpush2.default);
router.use('/contact', _contact2.default);
router.use('/result', _result2.default);
router.use('/reserved', _reserved2.default);
router.use('/group', _group2.default);
router.use('/client', _client2.default);

exports.default = router;