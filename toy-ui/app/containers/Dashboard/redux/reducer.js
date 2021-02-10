import produce from 'immer';

import types from './types';

export const initialState = {
  getting: false,
  writers: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.getWriters:
        draft.getting = true;
        draft.writers = false;
        break;

      case types.getWritersSuccess:
        draft.getting = false;
        draft.writers = action.writers;
        break;

      case types.reset:
        draft.getting = false;
        break;
    }
  });
