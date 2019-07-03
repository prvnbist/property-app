import {
    LOGIN_REQUEST,
    LOGIN_TOKEN,
    LOGOUT,
    SIGNUP,
    SIGNUP_ERROR,
    REQUEST_PROPERTIES,
    RECIEVE_PROPERTIES,
} from './types';

export const loginRequest = payload => ({
    type: LOGIN_REQUEST,
    payload,
});

export const loginToken = payload => ({
    type: LOGIN_TOKEN,
    payload,
});

export const logout = () => ({
    type: LOGOUT,
});

export const signup = payload => ({
    type: SIGNUP,
    payload,
});

export const requestProperties = () => ({
    type: REQUEST_PROPERTIES,
});
