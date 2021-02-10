import { call, put, takeLatest } from 'redux-saga/effects';

// constants
import config from 'constants/config';

// utils
import XHR from 'utils/xhr';
import showNotification from 'utils/toast';

// redux
import types from './types';
import {
  getArticles as getArticlesAction,
  getArticlesSuccess,
  reset,
} from './actions';

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

function updateApprovalStatusAPI(id, data) {
  const URL = `${config.baseUrl}/api/v1/article/${id}/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    method: 'PATCH',
    data,
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

function* updateApprovalStatus({ id, status }) {
  try {
    yield call(updateApprovalStatusAPI, id, status);
    yield put(getArticlesAction());
  } catch (e) {
  } finally {
    yield put(reset());
  }
}

export default function* watcher() {
  yield takeLatest(types.getArticles, getArticles);
  yield takeLatest(types.updateApprovalStatus, updateApprovalStatus);
}
