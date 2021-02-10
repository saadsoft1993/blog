import produce from 'immer';

import types from './types';

export const initialState = {
  registering: false,
  errors: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.register:
        draft.registering = true;
        draft.errors = false;
        break;

      case types.registrationFailure:
        draft.registering = false;
        draft.errors = action.errors;
        break;

      case types.reset:
        draft.registering = false;
        draft.errors = false;
        break;
    }
  });
