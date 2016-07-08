import { constantsBuilder } from './constantsBuilder.js';
import { actionsBuilder } from './actionsBuilder.js';
import { sagasBuilder } from './sagasBuilder.js';

const defaultOptions = {
  namespace: false,
  flattenExports: false,
};

export function requestWrapper(request, constantCreator, options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  };

  const { namespace } = options;
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
  let sagas = sagasBuilder(request, constants.REQUEST, actions);

  constants = {
    [namespace ? `${namespaceUpper}_REQUEST` : 'REQUEST']: constants.REQUEST,
    [namespace ? `${namespaceUpper}_PENDING` : 'PENDING']: constants.PENDING,
    [namespace ? `${namespaceUpper}_SUCCESS` : 'SUCCESS']: constants.SUCCESS,
    [namespace ? `${namespaceUpper}_FAILURE` : 'FAILURE']: constants.FAILURE,
  };
  actions = {
    [namespace ? `${namespace}Request` : 'request']: actions.request,
    [namespace ? `${namespace}Pending` : 'pending']: actions.pending,
    [namespace ? `${namespace}Success` : 'success']: actions.success,
    [namespace ? `${namespace}Failure` : 'failure']: actions.failure,
  };
  sagas = {
    [namespace ? `request${namespaceTitle}` : 'makeRequest']: sagas.makeRequest,
    [namespace ? `watchFor${namespaceTitle}Request` : 'watchForRequest']: sagas.watchForRequest,
  };

  if (options.flattenExports) {
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
