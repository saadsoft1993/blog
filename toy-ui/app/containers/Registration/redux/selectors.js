import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegistration = state => state.registration || initialState;

const makeSelectRegistering = () =>
  createSelector(
    selectRegistration,
    state => state.registering,
  );

const makeSelectErrors = () =>
  createSelector(
    selectRegistration,
    state => state.errors,
  );

export { makeSelectRegistering, makeSelectErrors };
