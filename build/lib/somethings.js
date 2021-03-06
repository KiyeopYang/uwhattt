"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function hasProperty(obj, prop) {
  return Object.hasOwnProperty.call(obj, prop);
}
function isSameId(id1, id2) {
  return String(id1) === String(id2);
}
exports.hasProperty = hasProperty;
exports.isSameId = isSameId;