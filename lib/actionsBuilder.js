'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionsBuilder = actionsBuilder;

var _reduxActions = require('redux-actions');

var payloadCreator = function payloadCreator(payload) {
  return payload;
};
var metaCreator = function metaCreator(payload, meta) {
  return meta;
};

function actionsBuilder(constants) {
  return {
    request: (0, _reduxActions.createAction)(constants.REQUEST, payloadCreator, metaCreator),
    pending: (0, _reduxActions.createAction)(constants.PENDING, payloadCreator, metaCreator),
    success: (0, _reduxActions.createAction)(constants.SUCCESS, payloadCreator, metaCreator),
    failure: (0, _reduxActions.createAction)(constants.FAILURE, payloadCreator, metaCreator)
  };
}
//# sourceMappingURL=actionsBuilder.js.map