import { combineReducers } from 'redux';
import user from './user_reducer';

// Using combineReducer if in future I'll need to add more reducers to the project

const rootReducer = combineReducers({
    user,
});

export default rootReducer;
