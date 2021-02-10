import produce from 'immer';

import types from './types';

export const initialState = {
  getting: false,
  errors: false,
  article: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.getArticle:
        draft.getting = true;
        draft.errors = false;
        break;

      case types.getArticleSuccess:
        draft.getting = false;
        draft.errors = false;
        draft.article = action.article;
        break;

      case types.reset:
        draft.getting = false;
        draft.errors = false;
        break;
    }
  });
