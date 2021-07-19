export const changeUser = payload => {
  console.log('change user state');
  return {
    type: 'CHANGE_USER_STATE',
    payload: payload,
  };
};
