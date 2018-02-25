'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GCM_API_KEY = 'AAAATCNfU6I:APA91bGb75nkccXKjHkIHQdhWnuLqlVsnBVxk40n3WY8xqce-sgCgLubbwRDtGAurUjnX1bdzGkeOF8EpLJ63UUtBql5TIH4jL0xoSA4vFrNMZQ99DubIQG7Ph_wMTGxN0g6oClnDP7f';

_webPush2.default.setGCMAPIKey(GCM_API_KEY);

function handlePracticePush(_ref) {
  var subscription = _ref.subscription,
      push = _ref.push;

  return new Promise(function (resolve, reject) {
    var endpoint = subscription.endpoint,
        keys = subscription.keys;
    var key = keys.key,
        authSecret = keys.authSecret;

    var pushJSON = push;
    pushJSON.redirect = push.redirectUrl;
    _webPush2.default.sendNotification({
      endpoint: endpoint,
      TTL: 0,
      keys: {
        p256dh: key,
        auth: authSecret
      }
    }, JSON.stringify(pushJSON)).then(resolve).catch(reject);
  });
}

exports.default = handlePracticePush;