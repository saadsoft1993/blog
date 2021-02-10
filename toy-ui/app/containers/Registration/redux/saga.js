import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

// constants
import config from 'constants/config';

// utils
import XHR from 'utils/xhr';
import showNotification from 'utils/toast';

// redux
import types from './types';
import { registrationFailure, reset } from './actions';

function registrationAPI(data) {
  const URL = `${config.baseUrl}/api/register/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* register({ data }) {
  try {
    yield call(registrationAPI, data);
    yield put(reset());
    yield put(push('/login'));
  } catch (e) {
    const { response } = e;
    if (response && response.status === 400 && response.data.username) {
      showNotification(response.data.username[0], 'error');
    }
  }
}

export default function* watcher() {
  yield takeLatest(types.register, register);
}
