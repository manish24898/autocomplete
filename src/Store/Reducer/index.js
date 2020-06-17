import { combineReducers } from 'redux';
import UserReducer from './Users';

export default combineReducers({
    users: UserReducer,
});
