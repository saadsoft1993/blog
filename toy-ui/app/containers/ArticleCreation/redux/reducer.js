import produce from 'immer';

import types from './types';

export const initialState = {
  creating: false,
  errors: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.createArticle:
        draft.creating = true;
        draft.errors = false;
        break;

      case types.reset:
        draft.creating = false;
        draft.errors = false;
        break;
    }
  });
