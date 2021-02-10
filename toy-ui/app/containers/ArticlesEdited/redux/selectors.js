import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectArticlesEdited = state => state.articlesEdited || initialState;

const makeSelectArticles = () =>
  createSelector(
    selectArticlesEdited,
    state => state.articles,
  );

export { makeSelectArticles };
