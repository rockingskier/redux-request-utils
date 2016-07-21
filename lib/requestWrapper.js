'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = requestWrapper;

var _constantsBuilder = require('./constantsBuilder.js');

var _constantsBuilder2 = _interopRequireDefault(_constantsBuilder);

var _actionsBuilder = require('./actionsBuilder.js');

var _actionsBuilder2 = _interopRequireDefault(_actionsBuilder);

var _sagasBuilder = require('./sagasBuilder.js');

var _sagasBuilder2 = _interopRequireDefault(_sagasBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  namespace: false,
  flattenExports: false
};

function requestWrapper(request, constantCreator) {
  var _constants, _actions, _sagas;

  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _defaultOptions$optio = _extends({}, defaultOptions, options);

  var namespace = _defaultOptions$optio.namespace;
  var flattenExports = _defaultOptions$optio.flattenExports;


  if (namespace) {
    constantCreator = constantCreator.createChild(namespace);
  }
  var namespaceUpper = namespace ? namespace.toUpperCase() : false;
  var namespaceTitle = namespace ? namespace[0].toUpperCase() + namespace.slice(1) : false;

  // Constants
  var constants = (0, _constantsBuilder2.default)(constantCreator);

  // Actions
  var actions = (0, _actionsBuilder2.default)(constants);

  // Sagas
  var sagas = (0, _sagasBuilder2.default)(request, constants.REQUEST, actions);

  constants = (_constants = {}, _defineProperty(_constants, namespace ? namespaceUpper + '_REQUEST' : 'REQUEST', constants.REQUEST), _defineProperty(_constants, namespace ? namespaceUpper + '_PENDING' : 'PENDING', constants.PENDING), _defineProperty(_constants, namespace ? namespaceUpper + '_SUCCESS' : 'SUCCESS', constants.SUCCESS), _defineProperty(_constants, namespace ? namespaceUpper + '_FAILURE' : 'FAILURE', constants.FAILURE), _constants);
  actions = (_actions = {}, _defineProperty(_actions, namespace ? namespace + 'Request' : 'request', actions.request), _defineProperty(_actions, namespace ? namespace + 'Pending' : 'pending', actions.pending), _defineProperty(_actions, namespace ? namespace + 'Success' : 'success', actions.success), _defineProperty(_actions, namespace ? namespace + 'Failure' : 'failure', actions.failure), _actions);
  sagas = (_sagas = {}, _defineProperty(_sagas, namespace ? 'request' + namespaceTitle : 'makeRequest', sagas.makeRequest), _defineProperty(_sagas, namespace ? 'watchFor' + namespaceTitle + 'Request' : 'watchForRequest', sagas.watchForRequest), _sagas);

  if (flattenExports) {
    return _extends({}, constants, actions, sagas);
  }

  return {
    constants: constants,
    actions: actions,
    sagas: sagas
  };
}
//# sourceMappingURL=requestWrapper.js.map