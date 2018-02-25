'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _indexTest = require('./website/index-test');

var _indexTest2 = _interopRequireDefault(_indexTest);

var _indexTest3 = require('./group/index-test');

var _indexTest4 = _interopRequireDefault(_indexTest3);

var _indexTest5 = require('./client/index-test');

var _indexTest6 = _interopRequireDefault(_indexTest5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('api test', function (t) {
  return t.pass();
});
(0, _indexTest2.default)(_2.default, '/api/website');
(0, _indexTest4.default)(_2.default, '/api/group');
(0, _indexTest6.default)(_2.default, '/api/client');