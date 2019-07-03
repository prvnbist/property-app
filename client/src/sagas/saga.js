import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    SIGNUP,
    LOGIN,
    AUTH_REDUCER,
    CREATE_PROPERTY,
} from '../actions/types';

import { makeProperty } from './makeProperty';
import loginCall from './loginCall';

function* addProperty({ payload }) {
    try {
        yield call(makeProperty, payload);
    } catch (e) {
        console.log(e);
    }
}

function* auth(payload) {
    try {
        const data = yield call(loginCall, payload);
        yield put({ type: AUTH_REDUCER, payload: data });
    } catch (e) {
        console.log(e);
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(CREATE_PROPERTY, addProperty),
        takeEvery(LOGIN, auth),
        takeEvery(SIGNUP, auth),
    ]);
}
