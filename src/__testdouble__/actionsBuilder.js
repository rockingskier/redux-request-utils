import { expect } from 'chai';


describe('actionsBuilder', () => {
  let actionsBuilder;
  let constants = {
    REQUEST: 'REQUEST',
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
  };

  before(() => {
    actionsBuilder = require('../actionsBuilder.js').actionsBuilder;
  });

  it('should create a "request" action', () => {
    const actions = actionsBuilder(constants);

    expect(actions['request']).to.be.a('function');

    const action = actions.request();
    expect(action.type).to.equal('REQUEST');
  });

  it('should create a "pending" action', () => {
    const actions = actionsBuilder(constants);

    expect(actions['pending']).to.be.a('function');

    const action = actions.pending();
    expect(action.type).to.equal('PENDING');
  });

  it('should create a "success" action', () => {
    const actions = actionsBuilder(constants);

    expect(actions['success']).to.be.a('function');

    const action = actions.success();
    expect(action.type).to.equal('SUCCESS');
  });

  it('should create a "failure" action', () => {
    const actions = actionsBuilder(constants);

    expect(actions['failure']).to.be.a('function');

    const action = actions.failure();
    expect(action.type).to.equal('FAILURE');
  });
});
