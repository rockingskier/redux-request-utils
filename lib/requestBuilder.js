'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = requestBuilder;

var _normalizr = require('normalizr');

var _standardHttpError = require('standard-http-error');

var _standardHttpError2 = _interopRequireDefault(_standardHttpError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requestBuilder(url) {
  var requestOpts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$handleResponse = _ref.handleResponse;
  var handleResponse = _ref$handleResponse === undefined ? false : _ref$handleResponse;
  var _ref$normalizeSchema = _ref.normalizeSchema;
  var normalizeSchema = _ref$normalizeSchema === undefined ? false : _ref$normalizeSchema;
  var _ref$handleError = _ref.handleError;
  var handleError = _ref$handleError === undefined ? false : _ref$handleError;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    url = typeof url === 'function' ? url.apply(undefined, args) : url;

    var callOpts = _extends({}, requestOpts);

    if (typeof callOpts.body === 'function') {
      callOpts.body = callOpts.body.apply(callOpts, args);
    }
    if (typeof callOpts.body !== 'undefined' && typeof callOpts.body !== 'string') {
      callOpts.body = JSON.stringify(callOpts.body);
    }

    return fetch(url, callOpts).then(function (response) {
      switch (response.status) {
        case 200:
        case 201:
          return response; // Keep going!
        default:
          throw new _standardHttpError2.default(response.status, { response: response });
      }
    }).then(function (response) {
      return handleResponse ? handleResponse.apply(undefined, [response].concat(args)) : response.json();
    }).then(function (data) {
      return normalizeSchema ? (0, _normalizr.normalize)(data, normalizeSchema) : data;
    }).catch(handleError ? function (err) {
      return handleError.apply(undefined, [err].concat(args));
    } : function (err) {
      throw err;
    });
  };
}
//# sourceMappingURL=requestBuilder.js.map