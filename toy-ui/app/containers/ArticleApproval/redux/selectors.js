import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectArticalApproval = state => state.articalApproval || initialState;

const makeSelectArticles = () =>
  createSelector(
    selectArticalApproval,
    state => state.articles,
  );

export { makeSelectArticles };
