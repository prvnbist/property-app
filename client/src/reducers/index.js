import { combineReducers } from 'redux';

import authReducers from './authReducers';
import propertyReducers from './propertyReducers';
const rootReducer = combineReducers({
    auth: authReducers,
    property: propertyReducers,
});

export default rootReducer;
