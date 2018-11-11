import { combineReducers } from 'redux';
import JobReducer from './JobReducer';

export default combineReducers({
    job: JobReducer,
});
