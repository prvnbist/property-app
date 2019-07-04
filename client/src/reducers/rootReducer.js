import {
    LOGOUT,
    AUTH,
    PROPERTY_MESSAGES,
    CLEAR_MESSAGES,
} from '../actions/types';
import jwtDecode from 'jwt-decode';

const initialState = {
    currentUser: {},
    errors: '',
    propertyMessages: '',
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH: {
            if (action.payload.error) {
                return {
                    ...state,
                    errors: action.payload.error,
                };
            } else {
                localStorage.setItem('access-token', action.payload);
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    errors: '',
                    currentUser: {
                        id: user.id,
                        name: user.name,
                    },
                };
            }
        }
        case LOGOUT: {
            localStorage.removeItem('access-token');
            return {
                ...state,
                currentUser: {},
                errors: '',
            };
        }
        case PROPERTY_MESSAGES: {
            return {
                ...state,
                propertyMessages: action.payload,
            };
        }
        case CLEAR_MESSAGES: {
            return {
                ...state,
                propertyMessages: null,
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
