import { LOGOUT, AUTH_REDUCER } from '../actions/types';
import jwtDecode from 'jwt-decode';

const initialState = {
    currentUser: {},
    errors: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REDUCER: {
            if (action.payload.error) {
                return {
                    ...state,
                    errors: {
                        message: action.payload.error,
                    },
                };
            } else {
                localStorage.setItem('access-token', action.payload);
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    errors: {},
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
                errors: {},
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
