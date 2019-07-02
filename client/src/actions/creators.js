import {
    LOGIN,
    SIGNUP,
    REQUEST_PROPERTIES,
    RECIEVE_PROPERTIES,
} from './types';

export const login = payload => ({
    type: LOGIN,
    payload,
});
export const signup = payload => ({
    type: SIGNUP,
    payload,
});

export const requestProperties = () => ({
    type: REQUEST_PROPERTIES,
});

export const recieveProperties = payload => ({
    type: RECIEVE_PROPERTIES,
    payload,
});
