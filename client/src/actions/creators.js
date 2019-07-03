import { LOGIN, LOGOUT, SIGNUP, FETCH_PROPERTIES } from './types';

export const login = payload => ({
    type: LOGIN,
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
    type: FETCH_PROPERTIES,
});
