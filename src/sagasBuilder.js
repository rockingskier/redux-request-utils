import { call, put, takeEvery } from 'redux-saga/effects';


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
      yield put(actions.pending(payload, meta));
      data = yield call(request, payload, meta);
      yield put(actions.success(data, meta));
    } catch (err) {
      error = err;
      yield put(actions.failure(error, meta));
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
