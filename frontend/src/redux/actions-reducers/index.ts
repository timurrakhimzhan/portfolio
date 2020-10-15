import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './user/userSlice'
import {authenticationReducer} from './authentication/authenticationSlice';
import {applicationReducer} from './application/applicationSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    authentication: authenticationReducer,
    application: applicationReducer
});