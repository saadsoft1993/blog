import types from './types';

export const getArticle = id => ({
  type: types.getArticle,
  id,
});

export const getArticleSuccess = article => ({
  type: types.getArticleSuccess,
  article,
});

export const updateArticle = (id, article) => ({
  type: types.updateArticle,
  id,
  article,
});

export const reset = () => ({
  type: types.reset,
});
