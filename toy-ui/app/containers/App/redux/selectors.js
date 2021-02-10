import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    state => state.user,
  );

export { makeSelectUser };
