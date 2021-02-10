import types from './types';

export const createArticle = data => ({
  type: types.createArticle,
  data,
});

export const reset = () => ({
  type: types.reset,
});
