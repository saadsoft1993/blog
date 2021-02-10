import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

// constants
import config from 'constants/config';

// utils
import XHR from 'utils/xhr';
import showNotification from 'utils/toast';

// redux
import types from './types';
import { getWritersSuccess, reset } from './actions';

function getWritersAPI() {
  const URL = `${config.baseUrl}/api/v1/summary/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

function* getWriters() {
  try {
    const res = yield call(getWritersAPI);

    yield put(getWritersSuccess(res.data));
  } catch (e) {
  } finally {
    yield put(reset());
  }
}

export default function* watcher() {
  yield takeLatest(types.getWriters, getWriters);
}
