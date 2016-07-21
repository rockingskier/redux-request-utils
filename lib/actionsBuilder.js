'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = actionsBuilder;

var _reduxActions = require('redux-actions');

function actionsBuilder(constants) {
  return {
    request: (0, _reduxActions.createAction)(constants.REQUEST),
    pending: (0, _reduxActions.createAction)(constants.PENDING),
    success: (0, _reduxActions.createAction)(constants.SUCCESS),
    failure: (0, _reduxActions.createAction)(constants.FAILURE)
  };
}
//# sourceMappingURL=actionsBuilder.js.map