import produce from 'immer';
import types from './types';

export const initialState = {
  user: false,
  token: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.setUser:
        draft.user = { ...action.user };
        break;

      case types.setToken:
        draft.token = action.token;
        break;

      case types.logout:
        draft.user = false;
        draft.token = false;
        break;
    }
  });
