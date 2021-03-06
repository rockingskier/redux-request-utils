import td from 'testdouble';
import { expect } from 'chai';


describe('requestWrapper', () => {
  let constantsBuilder;
  let actionsBuilder;
  let sagasBuilder;
  let requestWrapper;

  let request;
  let constantCreator;

  beforeEach(() => {
    constantsBuilder = td.replace('../constantsBuilder.js').constantsBuilder;
    actionsBuilder = td.replace('../actionsBuilder.js').actionsBuilder;
    sagasBuilder = td.replace('../sagasBuilder.js').sagasBuilder;
    requestWrapper = require('../requestWrapper.js').requestWrapper;

    request = td.function();
    constantCreator = {
      createChild: td.function(),
      createConstant: td.function(),
    };

    const constants = {
      REQUEST: 'REQUEST',
      PENDING: 'PENDING',
      SUCCESS: 'SUCCESS',
      FAILURE: 'FAILURE',
    };
    td.when(constantsBuilder(td.matchers.anything())).thenReturn(constants);

    const actions = {
      request: td.function(),
      pending: td.function(),
      success: td.function(),
      failure: td.function(),
    };
    td.when(actionsBuilder(td.matchers.anything())).thenReturn(actions);

    td.when(sagasBuilder(request, constants.REQUEST, actions, { throwErrors: false })).thenReturn({
      makeRequest: td.function(),
      watchForRequest: td.function(),
    });
  });

  afterEach(() => {
    td.reset();
  });

  it('should be a function', () => {
    expect(requestWrapper).to.be.a('function');
  });

  describe('default', () => {
    let result;

    beforeEach(() => {
      result = requestWrapper(request, constantCreator);
    });

    it('should export constants', () => {
      expect(result).to.have.property('constants');
      const { constants } = result;
      expect(constants).to.have.property('REQUEST');
      expect(constants).to.have.property('PENDING');
      expect(constants).to.have.property('SUCCESS');
      expect(constants).to.have.property('FAILURE');
    });

    it('should export actions', () => {
      expect(result).to.have.property('actions');
      const { actions } = result;
      expect(actions).to.have.property('request');
      expect(actions).to.have.property('pending');
      expect(actions).to.have.property('success');
      expect(actions).to.have.property('failure');
    });

    it('should export sagas', () => {
      expect(result).to.have.property('sagas');
      const { sagas } = result;
      expect(sagas).to.have.property('makeRequest');
      expect(sagas).to.have.property('watchForRequest');
    });
  });

  describe('namespaced', () => {
    let result;

    beforeEach(() => {
      result = requestWrapper(request, constantCreator, { namespace: 'namespace' });
    });

    it('should export constants', () => {
      expect(result).to.have.property('constants');
      const { constants } = result;
      expect(constants).to.have.property('REQUEST');
      expect(constants).to.have.property('PENDING');
      expect(constants).to.have.property('SUCCESS');
      expect(constants).to.have.property('FAILURE');
    });

    it('should export actions', () => {
      expect(result).to.have.property('actions');
      const { actions } = result;
      expect(actions).to.have.property('request');
      expect(actions).to.have.property('pending');
      expect(actions).to.have.property('success');
      expect(actions).to.have.property('failure');
    });

    it('should export sagas', () => {
      expect(result).to.have.property('sagas');
      const { sagas } = result;
      expect(sagas).to.have.property('makeRequest');
      expect(sagas).to.have.property('watchForRequest');
    });
  });

  describe('named exports', () => {
    let result;

    beforeEach(() => {
      result = requestWrapper(request, constantCreator, { namedExports: true, namespace: 'namespace' });
    });

    it('should throw an error if no "namespace" is provided', () => {
      try {
        requestWrapper(request, constantCreator, { namedExports: true, namespace: undefined });
      } catch(err) {
        expect(err.message).to.equal('Namespaced exports require a namespace');
      }
    });

    it('should export constants', () => {
      const { constants } = result;
      expect(constants).to.have.property('NAMESPACE_REQUEST');
      expect(constants).to.have.property('NAMESPACE_PENDING');
      expect(constants).to.have.property('NAMESPACE_SUCCESS');
      expect(constants).to.have.property('NAMESPACE_FAILURE');
    });

    it('should export actions', () => {
      const { actions } = result;
      expect(actions).to.have.property('namespaceRequest');
      expect(actions).to.have.property('namespacePending');
      expect(actions).to.have.property('namespaceSuccess');
      expect(actions).to.have.property('namespaceFailure');
    });

    it('should export sagas', () => {
      const { sagas } = result;
      expect(sagas).to.have.property('makeNamespaceRequest');
      expect(sagas).to.have.property('watchForNamespaceRequest');
    });
  });

  describe('flattened exports', () => {
    let result;

    beforeEach(() => {
      result = requestWrapper(request, constantCreator, { flattenExports: true });
    });

    it('should export constants', () => {
      expect(result).to.not.have.property('constants');
      expect(result).to.have.property('REQUEST');
      expect(result).to.have.property('PENDING');
      expect(result).to.have.property('SUCCESS');
      expect(result).to.have.property('FAILURE');
    });

    it('should export actions', () => {
      expect(result).to.not.have.property('actions');
      expect(result).to.have.property('request');
      expect(result).to.have.property('pending');
      expect(result).to.have.property('success');
      expect(result).to.have.property('failure');
    });

    it('should export sagas', () => {
      expect(result).to.not.have.property('sagas');
      expect(result).to.have.property('makeRequest');
      expect(result).to.have.property('watchForRequest');
    });
  });
});
