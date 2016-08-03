import { expect } from 'chai';


describe('actionsBuilder', () => {
  let actionsBuilder;
  let constants = {
    REQUEST: 'REQUEST',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
  };
  let actions;

  before(() => {
    actionsBuilder = require('../actionsBuilder.js').actionsBuilder;
    actions = actionsBuilder(constants);
  });

  it('should create a "request" action', () => {
    expect(actions['request']).to.be.a('function');

    const action = actions.request();
    expect(action.type).to.equal('REQUEST');
  });

  it('should create a "pending" action', () => {
    expect(actions['pending']).to.be.a('function');

    const action = actions.pending();
    expect(action.type).to.equal('PENDING');
  });

  it('should create a "success" action', () => {
    expect(actions['success']).to.be.a('function');

    const action = actions.success();
    expect(action.type).to.equal('SUCCESS');
  });

  it('should create a "failure" action', () => {
    expect(actions['failure']).to.be.a('function');

    const action = actions.failure();
    expect(action.type).to.equal('FAILURE');
  });

  describe('actionCreators', () => {
    it('should return arg 0 as the payload', () => {
      const requestAction = actions.request({ data: 'request' });
      expect(requestAction.payload).to.deep.equal({ data: 'request' });

      const pendingAction = actions.pending({ data: 'pending' });
      expect(pendingAction.payload).to.deep.equal({ data: 'pending' });

      const successAction = actions.success({ data: 'success' });
      expect(successAction.payload).to.deep.equal({ data: 'success' });

      const failureAction = actions.failure({ data: 'failure' });
      expect(failureAction.payload).to.deep.equal({ data: 'failure' });
    });

    it('should return arg 1 as meta data', () => {
      const requestAction = actions.request(undefined, { meta: 'request' });
      expect(requestAction.meta).to.deep.equal({ meta: 'request' });

      const pendingAction = actions.pending(undefined, { meta: 'pending' });
      expect(pendingAction.meta).to.deep.equal({ meta: 'pending' });

      const successAction = actions.success(undefined, { meta: 'success' });
      expect(successAction.meta).to.deep.equal({ meta: 'success' });

      const failureAction = actions.failure(undefined, { meta: 'failure' });
      expect(failureAction.meta).to.deep.equal({ meta: 'failure' });
    });
  });
});
