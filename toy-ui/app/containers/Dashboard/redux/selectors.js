import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboard = state => state.dashboard || initialState;

const makeSelectWriters = () =>
  createSelector(
    selectDashboard,
    state => state.writers,
  );

export { makeSelectWriters };
