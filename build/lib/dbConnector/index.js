"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// nested Object는 변경 안된다.
function fromMongo(item) {
  if (item) {
    if (Array.isArray(item)) {
      item.forEach(function (o) {
        if (o) {
          o.id = o._id;
          delete o._id;
        }
      });
    } else {
      item.id = item._id;
      delete item._id;
    }
  }
  return item;
}
function toMongo(item) {
  if (item) {
    if (Array.isArray(item)) {
      item.forEach(function (o) {
        if (o) {
          delete o._id;
          delete o.id;
        }
      });
    } else {
      delete item._id;
      delete item.id;
    }
  }
  return item;
}

exports.fromMongo = fromMongo;
exports.toMongo = toMongo;