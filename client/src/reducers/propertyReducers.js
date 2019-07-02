import { RECIEVE_PROPERTIES } from '../actions/types';

const propertyReducers = (state = [], action) => {
    switch (action.type) {
        case RECIEVE_PROPERTIES:
            return action.payload;
        default:
            return state;
    }
};

export default propertyReducers;
