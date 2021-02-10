import produce from 'immer';

import types from './types';

export const initialState = {
  getting: false,
  articles: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.getArticles:
        draft.getting = true;
        draft.articles = false;
        break;

      case types.getArticlesSuccess:
        draft.getting = false;
        draft.articles = action.articles;
        break;

      case types.reset:
        draft.getting = false;
        break;
    }
  });
