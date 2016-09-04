'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionBuilder = actionBuilder;
exports.actionsBuilder = actionsBuilder;

var _reduxActions = require('redux-actions');

var payloadCreator = function payloadCreator(payload) {
  return payload;
};
var metaCreator = function metaCreator(payload, meta) {
  return meta;
};

function actionBuilder(constant) {
  return (0, _reduxActions.createAction)(constant, payloadCreator, metaCreator);
}

function actionsBuilder(constants) {
  return {
    request: actionBuilder(constants.REQUEST),
    pending: actionBuilder(constants.PENDING),
    success: actionBuilder(constants.SUCCESS),
    failure: actionBuilder(constants.FAILURE)
  };
}
//# sourceMappingURL=actionsBuilder.js.map