export function constantsBuilder(constantCreator, namespace) {
  if (namespace) {
    constantCreator = constantCreator.createChild(namespace);
  }

  return {
    REQUEST: constantCreator.createConstant('REQUEST'),
    PENDING: constantCreator.createConstant('PENDING'),
    SUCCESS: constantCreator.createConstant('SUCCESS'),
    FAILURE: constantCreator.createConstant('FAILURE'),
  };
}
