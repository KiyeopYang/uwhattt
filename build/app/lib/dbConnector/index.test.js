'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fromMongo
(0, _ava2.default)('fromMongo', function (t) {
  t.plan(4);
  var inputA = [{
    _id: 'inputA'
  }];
  var inputB = {
    _id: 'inputB'
  };
  var inputC = [undefined];
  var inputD = undefined;
  var outputA = (0, _.fromMongo)(inputA);
  var outputB = (0, _.fromMongo)(inputB);
  var outputC = (0, _.fromMongo)(inputC);
  var outputD = (0, _.fromMongo)(inputD);
  outputA.forEach(function (o) {
    if (!o._id && o.id === 'inputA') {
      t.pass();
    }
  });
  if (!outputB._id && outputB.id === 'inputB') {
    t.pass();
  }
  t.is(outputC, inputC);
  t.is(outputD, inputD);
});

// toMongo
(0, _ava2.default)('toMongo', function (t) {
  t.plan(2);
  var inputA = [{
    id: 'inputA',
    _id: 'inputA'
  }];
  var inputB = {
    id: 'inputB',
    _id: 'inputB'
  };
  var outputA = (0, _.toMongo)(inputA);
  var outputB = (0, _.toMongo)(inputB);
  outputA.forEach(function (o) {
    if (!o.id && !o._id) {
      t.pass();
    }
  });
  if (!outputB.id && !outputB._id) {
    t.pass();
  }
});