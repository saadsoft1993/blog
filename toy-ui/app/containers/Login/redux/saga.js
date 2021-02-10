import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

// constants
import config from 'constants/config';

// utils
import XHR from 'utils/xhr';
import showNotification from 'utils/toast';

// redux
import { setUser, setToken } from 'containers/App/redux/actions';
import types from './types';
import { loginFailure, reset } from './actions';

function loginAPI(data) {
  const URL = `${config.baseUrl}/api/login/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* login({ data }) {
  try {
    const res = yield call(loginAPI, data);
    yield put(reset());

    localStorage.setItem('token', res.data.access);
    yield put(setUser(res.data));
    yield put(setToken(res.data.access));
  } catch (e) {
    const { response } = e;

    if (response && response.data.detail) {
      showNotification(response.data.detail, 'error');
    }
    // yield put(loginFailure(response.data.message));
  }
}

export default function* watcher() {
  yield takeLatest(types.login, login);
}
