import types from './types';

export const login = data => ({
  type: types.login,
  data,
});

export const loginFailure = errors => ({
  type: types.loginFailure,
  errors,
});

export const reset = () => ({
  type: types.reset,
});
