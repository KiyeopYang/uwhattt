'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nconf = require('nconf');

var _nconf2 = _interopRequireDefault(_nconf);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nconf2.default
// 1. CMD Arguments
.argv()
// 2. 환경 변수
.env(['GCLOUD_PROJECT', 'CLOUD_BUCKET', 'DATA_BACKEND', 'MONGO_URL', 'NODE_ENV', 'PORT', 'SECRET'])
// 3. Config file
.file({ file: _path2.default.join(__dirname, '../', 'config.json') })
// 4. Defaults
.defaults({
  PORT: 8080,
  SECRET: 'yangkiyeopsecret',
  NODE_ENV: 'development'
});

function checkConfig(setting) {
  if (!_nconf2.default.get(setting)) {
    throw new Error('You must set ' + setting + ' as an environment variable or in config.json!');
  }
}

// 필수 세팅 체크
checkConfig('GCLOUD_PROJECT');
checkConfig('CLOUD_BUCKET');
if (_nconf2.default.get('DATA_BACKEND') === 'mongodb') {
  checkConfig('MONGO_URL');
}

exports.default = _nconf2.default;