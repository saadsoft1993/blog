import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

const makeSelectLoggingIn = () =>
  createSelector(
    selectLogin,
    state => state.loggingIn,
  );

const makeSelectErrors = () =>
  createSelector(
    selectLogin,
    state => state.errors,
  );

export { makeSelectLoggingIn, makeSelectErrors };
