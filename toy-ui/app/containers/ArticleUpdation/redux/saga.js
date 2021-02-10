import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

// constants
import config from 'constants/config';

// utils
import XHR from 'utils/xhr';
import showNotification from 'utils/toast';

// redux
import types from './types';
import { getArticleSuccess, reset } from './actions';

function getArticleAPI(id) {
  const URL = `${config.baseUrl}/api/v1/article/${id}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

function updateArticleAPI(id, data) {
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

function* getArticle({ id }) {
  try {
    const res = yield call(getArticleAPI, id);
    yield put(getArticleSuccess(res.data));
  } catch (e) {
  } finally {
    yield put(reset());
  }
}

function* updateArticle({ id, article }) {
  try {
    yield call(updateArticleAPI, id, article);
    showNotification('Article updated successfully', 'success');
  } catch (e) {
  } finally {
    yield put(reset());
  }
}

export default function* watcher() {
  yield takeLatest(types.getArticle, getArticle);
  yield takeLatest(types.updateArticle, updateArticle);
}
