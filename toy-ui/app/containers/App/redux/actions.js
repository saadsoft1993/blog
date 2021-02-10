import types from './types';

export const setUser = user => ({
  type: types.setUser,
  user,
});

export const setToken = token => ({
  type: types.setToken,
  token,
});

export const logout = () => ({
  type: types.logout,
});
