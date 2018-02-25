'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var to = _ref.to,
      title = _ref.title,
      content = _ref.content,
      html = _ref.html;

  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(_path2.default.join(__dirname, 'config.json'), 'utf-8', function (error, data) {
      if (error) {
        return reject(error);
      }
      var account = JSON.parse(data);
      var smtpTransport = _nodemailer2.default.createTransport({
        host: 'smtp.gmail.com',
        auth: {
          user: account.host,
          pass: account.password
        }
      });
      var mailOptions = {
        from: account.host,
        to: to || account.host,
        subject: title,
        text: content,
        html: html
      };
      return smtpTransport.sendMail(mailOptions, function (error, res) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
        return smtpTransport.close();
      });
    });
  });
};

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }