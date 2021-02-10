import { call, put, takeLatest } from 'redux-saga/effects';

// constants
import config from 'constants/config';

// utils
import XHR from 'utils/xhr';

// redux
import types from './types';
import { getArticlesSuccess, reset } from './actions';

function getArticlesAPI() {
  const URL = `${config.baseUrl}/api/v1/article/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

function* getArticles() {
  try {
    const res = yield call(getArticlesAPI);

    yield put(getArticlesSuccess(res.data));
  } catch (e) {
  } finally {
    yield put(reset());
  }
}

export default function* watcher() {
  yield takeLatest(types.getArticles, getArticles);
}
