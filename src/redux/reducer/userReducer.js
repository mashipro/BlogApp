const initialState = {
  userName: 'default_name',
  userUID: 'default_UID',
  userEmail: 'default_Email',
};

const TAG = 'userReducer// ';

export default (state = initialState, {type, payload}) => {
  console.log(TAG, 'type trigger: ', type, ' //with payload: ', payload);
  switch (type) {
    case 'CHANGE_USER_STATE':
      return {
        ...state,
        userName: payload.userName,
        userUID: payload.userUID,
        userEmail: payload.userEmail,
      };

    default:
      return state;
  }
};
