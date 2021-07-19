const initialState = {
  totalClicks: 0,
  clickerName: 'SKRRRRTSSS.......',
};

const TAG = 'userReducer// ';
export default (state = initialState, {type, payload}) => {
  console.log(TAG, 'type trigger: ', type, ' //with payload: ', payload);
  switch (type) {
    case 'ADD_CLICKS':
      return {...state, totalClicks: state.totalClicks + 1};
    case 'ADD_CLICKS':
      return {...state, totalClicks: state.totalClicks + 1};
    case 'CHANGE_CLICKER_NAME':
      return {...state, clickerName: payload};
    default:
      return state;
  }
};
