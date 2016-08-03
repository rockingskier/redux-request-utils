import td from 'testdouble';
import { expect } from 'chai';


describe('sagasBuilder', () => {
  let reduxSaga;
  let effects;
  let sagasBuilder;
  let payload;
  let request;
  let response;
  let REQUEST;
  let actions;

  before(() => {
    reduxSaga = require('redux-saga');
    effects = require('redux-saga/effects');
    sagasBuilder = require('../sagasBuilder.js').sagasBuilder;
  });

  beforeEach(() => {
    payload = { userId: 1 };
    response = { id: 1, userId: 1 };
    request = td.function();
    REQUEST = 'constant/REQUEST';
    actions = {
      pending: td.function(),
      success: td.function(),
      failure: td.function(),
    };

    td.when(actions.pending()).thenReturn({ type: 'constant/PENDING' });
    td.when(actions.success(response)).thenReturn({ type: 'constant/SUCCESS' });
    td.when(actions.failure(td.matchers.isA(Error))).thenReturn({ type: 'constant/FAILURE' });
  });

  afterEach(() => {
    td.reset();
  });

  describe('makeRequest', () => {
    let sagas;
    let generated;

    beforeEach(() => {
      sagas = sagasBuilder(request, REQUEST, actions);
    });

    it('should call `pending`, make the request and call `success`', () => {
      const generator = sagas.makeRequest({ payload });

      generated = generator.next();
      expect(generated.value).to.deep.equal(effects.put(actions.pending()));
      expect(generated.done).to.be.false;

      generated = generator.next();
      expect(generated.value).to.deep.equal(effects.call(request, payload, undefined));
      expect(generated.done).to.be.false;

      generated = generator.next(response);
      expect(generated.value).to.deep.equal(effects.put(actions.success(response)));
      expect(generated.done).to.be.false;

      generated = generator.next();
      expect(generated.done).to.be.true;
    });

    it('should call `pending`, make the request and call `error` if there is a problem', () => {
      const error = new Error('Something went wrong');
      const generator = sagas.makeRequest({ payload });

      generated = generator.next();
      expect(generated.value).to.deep.equal(effects.put(actions.pending()));
      expect(generated.done).to.be.false;

      generated = generator.throw(error);
      expect(generated.value).to.deep.equal(effects.put(actions.failure(error)));
      expect(generated.done).to.be.false;

      generated = generator.next();
      expect(generated.done).to.be.true;
    });
  });

  describe('watchForRequest', () => {
    let generated;
    let sagas;

    beforeEach(() => {
      sagas = sagasBuilder(request, REQUEST, actions);
    });

    it('should watch for all `requests`', () => {
      const generator = sagas.watchForRequest();

      generated = generator.next();
      expect(generated.value.name).to.equal(reduxSaga.takeEvery(REQUEST, sagas.makeRequest).name);
      expect(generated.done).to.be.false;

      generated = generator.next();
      expect(generated.done).to.be.true;
    });
  });
});
