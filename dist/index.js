"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var tagNameRegex = /<([:a-z_A-Z][:a-z_A-Z\-.0-9]*)/;
var attrsRegex = /([:a-z_A-Z][:a-z_A-Z\-.0-9]*)="([^"]*?)"/g;

var tag2obj = function tag2obj(tag) {
  var obj = {
    tagName: '',
    attrs: {},
    attrOrder: []
  };

  try {
    obj.tagName = tagNameRegex.exec(tag)[1];
  } catch (e) {
    e.message = "This tag format is not supported: ".concat(tag);
    throw e;
  }

  var attrs = tag.matchAll(attrsRegex);
  var objAttrs = obj.attrs,
      attrOrder = obj.attrOrder;

  var _iterator = _createForOfIteratorHelper(attrs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 3),
          attrName = _step$value[1],
          attrValue = _step$value[2];

      objAttrs[attrName] = attrValue;
      attrOrder.push(attrName);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return obj;
};

var obj2tag = function obj2tag(_ref) {
  var tagName = _ref.tagName,
      attrs = _ref.attrs,
      _ref$attrOrder = _ref.attrOrder,
      attrOrder = _ref$attrOrder === void 0 ? [] : _ref$attrOrder;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$isSelfClosing = _ref2.isSelfClosing,
      isSelfClosing = _ref2$isSelfClosing === void 0 ? true : _ref2$isSelfClosing,
      _ref2$finalSpace = _ref2.finalSpace,
      finalSpace = _ref2$finalSpace === void 0 ? true : _ref2$finalSpace;

  finalSpace = finalSpace ? ' ' : '';
  var tag = "<".concat(tagName);

  if (0 === attrOrder.length) {
    for (var _i2 = 0, _Object$entries = Object.entries(attrs); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
          attrName = _Object$entries$_i[0],
          attrValue = _Object$entries$_i[1];

      tag += " ".concat(attrName, "=\"").concat(attrValue, "\"");
    }
  } else {
    var _iterator2 = _createForOfIteratorHelper(attrOrder),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _attrName = _step2.value;
        tag += " ".concat(_attrName, "=\"").concat(attrs[_attrName], "\"");
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  return tag += isSelfClosing ? "".concat(finalSpace, "/>") : '>';
};

module.exports = {
  tag2obj: tag2obj,
  obj2tag: obj2tag
};