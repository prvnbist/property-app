import {
    LOGIN_TOKEN,
    RECIEVE_PROPERTIES,
    LOGOUT,
    SIGNUP,
} from '../actions/types';
import jwtDecode from 'jwt-decode';

const initialState = {
    currentUser: {},
    properties: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_TOKEN: {
            localStorage.setItem('access-token', action.payload);
            const user = jwtDecode(action.payload);
            return {
                ...state,
                currentUser: {
                    id: user.id,
                    name: user.name,
                },
            };
        }
        case LOGOUT: {
            localStorage.removeItem('access-token');
            return {
                ...state,
                currentUser: {},
            };
        }
        case SIGNUP: {
            return state;
        }
        case RECIEVE_PROPERTIES:
            return {
                ...state,
                properties: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
