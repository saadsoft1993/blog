export const loadState = () => {
  const serializedState = localStorage.getItem('global');
  if (serializedState === null) {
    return undefined;
  }

  return JSON.parse(serializedState);
};

export const saveState = state => {
  const serializedState = JSON.stringify({ global: state.global });
  localStorage.setItem('global', serializedState);
};
