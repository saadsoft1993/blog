import types from './types';

export const getArticles = () => ({
  type: types.getArticles,
});

export const getArticlesSuccess = articles => ({
  type: types.getArticlesSuccess,
  articles,
});

export const reset = () => ({
  type: types.reset,
});
