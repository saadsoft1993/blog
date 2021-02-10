import types from './types';

export const getWriters = () => ({
  type: types.getWriters,
});

export const getWritersSuccess = writers => ({
  type: types.getWritersSuccess,
  writers,
});

export const reset = () => ({
  type: types.reset,
});
