import {
    LOGIN,
    LOGOUT,
    SIGNUP,
    CREATE_PROPERTY,
    EDIT_PROPERTY,
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

export const createProperty = payload => ({
    type: CREATE_PROPERTY,
    payload,
});

export const editProperty = payload => ({
    type: EDIT_PROPERTY,
    payload,
});
