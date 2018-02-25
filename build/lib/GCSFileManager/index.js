'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.upload = exports.getUrl = undefined;

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _logging = require('../logging');

var _logging2 = _interopRequireDefault(_logging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLOUD_BUCKET = _config2.default.get('CLOUD_BUCKET'); /*
                                                          구글 클라우드 스토리지를 관리하는 모듈
                                                          */


var storage = (0, _storage2.default)({
  projectId: _config2.default.get('GCLOUD_PROJECT')
});
var bucket = storage.bucket(CLOUD_BUCKET);

// 구글 GCS 내의 주소 계산
function getUrl(file) {
  return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + file;
}
function upload(input, option) {
  return new Promise(function (resolve, reject) {
    var filename = input.filename,
        dir = input.dir,
        content = input.content;

    var filepath = dir + '/' + filename;
    var file = bucket.file(filepath);
    var stream = file.createWriteStream(option);
    stream.on('error', function (error) {
      _logging2.default.error();
      reject(error);
    });
    stream.on('finish', function () {
      file.makePublic().then(function () {
        resolve(getUrl(filepath));
      }).catch(reject);
    });
    stream.write(content);
    stream.end();
  });
}
function remove(input) {
  return new Promise(function (resolve, reject) {
    var filename = input.filename,
        dir = input.dir;

    var filepath = dir + '/' + filename;
    var file = bucket.file(filepath);
    if (!file) {
      reject();
    } else {
      file.delete().then(function () {
        resolve();
      }).catch(function (error) {
        _logging2.default.error(error);
        reject();
      });
    }
  });
}
exports.getUrl = getUrl;
exports.upload = upload;
exports.remove = remove;