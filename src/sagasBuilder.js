import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

const defaultOptions = {
  throwErrors: false,
};
export function sagasBuilder(request, REQUEST, actions, options = {}) {
  const {
    throwErrors,
  } = {
    ...defaultOptions,
    ...options,
  };

  function* makeRequest({ payload, meta }) {
    let data;
    let error;

    try {
      yield put(actions.pending());
      data = yield call(request, payload, meta);
      yield put(actions.success(data));
    } catch (err) {
      error = err;
      yield put(actions.failure(error));
      if (throwErrors) {
        throw error;
      }
    }

    return {
      data,
      error,
    };
  }

  function* watchForRequest() {
    yield takeEvery(REQUEST, makeRequest);
  }

  return {
    makeRequest,
    watchForRequest,
  };
}
