export const addClicks = payload => {
  console.log('adding clicks');
  return {
    type: 'ADD_CLICKS',
    payload: null,
  };
};
export const redClicks = payload => {
  console.log('reducing clicks');
  return {
    type: 'RED_CLICKS',
    payload: null,
  };
};
export const changeClickerName = payload => {
  console.log('adding clicks');
  return {
    type: 'CHANGE_CLICKER_NAME',
    payload: payload,
  };
};
