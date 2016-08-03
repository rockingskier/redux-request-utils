import constantsBuilder from './constantsBuilder.js';
import actionsBuilder from './actionsBuilder.js';
import sagasBuilder from './sagasBuilder.js';

const defaultOptions = {
  namespace: false,
  namedExports: false,
  flattenExports: false,
  throwErrors: false,
};

export default function requestWrapper(request, constantCreator, options = {}) {
  const {
    namespace,
    namedExports,
    flattenExports,
    throwErrors,
  } = {
    ...defaultOptions,
    ...options,
  };

  if (namedExports && !namespace) {
    throw new Error('Namespaced exports require a namespace');
  }

  if (namespace) {
    constantCreator = constantCreator.createChild(namespace);
  }
  const namespaceUpper = namespace ? namespace.toUpperCase() : false;
  const namespaceTitle = namespace ? (namespace[0].toUpperCase() + namespace.slice(1)) : false;


  // Constants
  let constants = constantsBuilder(constantCreator);

  // Actions
  let actions = actionsBuilder(constants);

  // Sagas
  let sagas = sagasBuilder(request, constants.REQUEST, actions, { throwErrors });

  constants = {
    [namedExports ? `${namespaceUpper}_REQUEST` : 'REQUEST']: constants.REQUEST,
    [namedExports ? `${namespaceUpper}_PENDING` : 'PENDING']: constants.PENDING,
    [namedExports ? `${namespaceUpper}_SUCCESS` : 'SUCCESS']: constants.SUCCESS,
    [namedExports ? `${namespaceUpper}_FAILURE` : 'FAILURE']: constants.FAILURE,
  };
  actions = {
    [namedExports ? `${namespace}Request` : 'request']: actions.request,
    [namedExports ? `${namespace}Pending` : 'pending']: actions.pending,
    [namedExports ? `${namespace}Success` : 'success']: actions.success,
    [namedExports ? `${namespace}Failure` : 'failure']: actions.failure,
  };
  sagas = {
    [namedExports ? `make${namespaceTitle}Request` : 'makeRequest']: sagas.makeRequest,
    [namedExports ? `watchFor${namespaceTitle}Request` : 'watchForRequest']: sagas.watchForRequest,
  };

  if (flattenExports) {
    return {
      ...constants,
      ...actions,
      ...sagas,
    };
  }

  return {
    constants,
    actions,
    sagas,
  };
}
