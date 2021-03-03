import {combineReducers} from 'redux';
import InfoReducer from './InfoReducer';
import JoinReducer from './JoinReducer';
import UserInfoReducer from './UserInfoReducer';

const rootReducer = combineReducers({
  InfoReducer,
  JoinReducer,
  UserInfoReducer,
});

export default rootReducer;
