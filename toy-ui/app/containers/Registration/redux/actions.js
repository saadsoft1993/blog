import types from './types';

export const register = data => ({
  type: types.register,
  data,
});

export const registrationFailure = errors => ({
  type: types.registrationFailure,
  errors,
});

export const reset = () => ({
  type: types.reset,
});
