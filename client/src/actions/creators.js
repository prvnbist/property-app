import {
    LOGIN,
    LOGOUT,
    SIGNUP,
    FETCH_PROPERTIES,
    FETCH_PROPERTY,
    CREATE_PROPERTY,
} from './types';

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

export const fetchProperties = () => ({
    type: FETCH_PROPERTIES,
});

export const getProperty = payload => ({
    type: FETCH_PROPERTY,
    payload,
});

export const createProperty = payload => ({
    type: CREATE_PROPERTY,
    payload,
});
