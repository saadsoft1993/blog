import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

// constants
import config from 'constants/config';

// utils
import XHR from 'utils/xhr';
import showNotification from 'utils/toast';

// redux
import types from './types';
import { reset } from './actions';

function createArticleAPI(data) {
  const URL = `${config.baseUrl}/api/v1/article/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* createArticle({ data }) {
  try {
    yield call(createArticleAPI, data);
    showNotification('Article created successfully', 'success');
  } catch (e) {
  } finally {
    yield put(reset());
  }
}

export default function* watcher() {
  yield takeLatest(types.createArticle, createArticle);
}
