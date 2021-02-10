import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectArticleUpdation = state => state.articleUpdation || initialState;

const makeSelectArticle = () =>
  createSelector(
    selectArticleUpdation,
    state => state.article,
  );

export { makeSelectArticle };
