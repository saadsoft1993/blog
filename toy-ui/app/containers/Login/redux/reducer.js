import produce from 'immer';

import types from './types';

export const initialState = {
  loggingIn: false,
  errors: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.login:
        draft.loggingIn = true;
        draft.errors = false;
        break;

      case types.loginFailure:
        draft.loggingIn = false;
        draft.errors = action.errors;
        break;

      case types.reset:
        draft.loggingIn = false;
        draft.errors = false;
        break;
    }
  });
