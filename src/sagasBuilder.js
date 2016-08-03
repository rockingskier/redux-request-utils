import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';


export default function sagasBuilder(request, REQUEST, actions, { throwErrors }) {
  function* makeRequest({ payload, meta }) {
    console.log('makeRequest', payload, meta);
    let data;
    let error;

    try {
      yield put(actions.pending());
      data = yield call(request, payload, meta);
      yield put(actions.success(data));
    } catch (err) {
      console.error(err);
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
