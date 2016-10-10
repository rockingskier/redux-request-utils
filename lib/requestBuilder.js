'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.requestBuilder = requestBuilder;

var _standardHttpError = require('standard-http-error');

var _standardHttpError2 = _interopRequireDefault(_standardHttpError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methodsWithBodies = ['POST', 'PUT', 'PATCH'];

function requestBuilder(url) {
  var requestOpts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$handleResponse = _ref.handleResponse;
  var handleResponse = _ref$handleResponse === undefined ? false : _ref$handleResponse;
  var _ref$handleSuccess = _ref.handleSuccess;
  var handleSuccess = _ref$handleSuccess === undefined ? false : _ref$handleSuccess;
  var _ref$handleError = _ref.handleError;
  var handleError = _ref$handleError === undefined ? false : _ref$handleError;

  return function (payload) {
    var meta = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // Build the URL
    var callUrl = typeof url === 'function' ? url(payload, meta) : url;

    // Options to pass to the `fetch` request
    var callOpts = _extends({}, requestOpts);

    // Headers
    var headers = {};
    if (meta.authToken) {
      headers['Authorization'] = 'Bearer ' + meta.authToken;
    }
    if (typeof callOpts.headers === 'function') {
      headers = callOpts.headers(headers, payload, meta);
    }
    if (headers.Authorization) {
      headers['Access-Control-Allow-Credentials'] = true;
      callOpts.credentials = 'include';
    }

    // Body
    var body = methodsWithBodies.includes(requestOpts.method) ? payload : undefined;
    if (typeof callOpts.body === 'function') {
      body = callOpts.body(body, meta);
    }
    if (typeof body !== 'undefined' && typeof body !== 'string') {
      body = JSON.stringify(body);
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
    }

    callOpts.headers = headers;
    callOpts.body = body;

    return fetch(callUrl, callOpts).then(function (response) {
      switch (response.status) {
        case 200:
        case 201:
          return response; // Keep going!
        default:
          throw new _standardHttpError2.default(response.status, { response: response });
      }
    }).then(function (response) {
      return handleResponse ? handleResponse(response, payload, meta) : response.json();
    }).then(function (data) {
      return handleSuccess ? handleSuccess(data, payload, meta) : data;
    }).catch(handleError ? function (err) {
      return handleError(err, payload, meta);
    } : function (err) {
      throw err;
    });
  };
}
//# sourceMappingURL=requestBuilder.js.map