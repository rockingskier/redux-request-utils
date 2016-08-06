'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constantsBuilder = constantsBuilder;
function constantsBuilder(constantCreator, namespace) {
  if (namespace) {
    constantCreator = constantCreator.createChild(namespace);
  }

  return {
    REQUEST: constantCreator.createConstant('REQUEST'),
    PENDING: constantCreator.createConstant('PENDING'),
    SUCCESS: constantCreator.createConstant('SUCCESS'),
    FAILURE: constantCreator.createConstant('FAILURE')
  };
}
//# sourceMappingURL=constantsBuilder.js.map