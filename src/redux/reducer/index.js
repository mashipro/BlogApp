import {combineReducers} from 'redux';
import clicksReducer from './clicksReducer';
import userReducer from './userReducer';

export default combineReducers({
  clickRed: clicksReducer,
  userRed: userReducer,
});
