import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';


export default function sagasBuilder(request, REQUEST, actions) {
  function* makeRequest({ type, payload }) {
    try {
      yield put(actions.pending());
      const data = yield call(request, payload);
      yield put(actions.success(data));
    } catch (err) {
      yield put(actions.failure(err));
    }
  }

  function* watchForRequest() {
    yield takeEvery(REQUEST, makeRequest);
  }

  return {
    makeRequest,
    watchForRequest,
  };
}
