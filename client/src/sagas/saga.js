import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    SIGNUP,
    LOGIN,
    LOGIN_REDUCER,
    SIGNUP_REDUCER,
    CREATE_PROPERTY,
} from '../actions/types';

import { makeProperty } from './makeProperty';
import loginCall from './loginCall';
import signupCall from './signupCall';

function* addProperty({ payload }) {
    try {
        yield call(makeProperty, payload);
    } catch (e) {
        console.log(e);
    }
}

function* loginUser(payload) {
    try {
        const data = yield call(loginCall, payload);
        yield put({ type: LOGIN_REDUCER, payload: data });
    } catch (e) {
        console.log(e);
    }
}

function* signupUser(payload) {
    try {
        const data = yield call(signupCall, payload);
        yield put({ type: SIGNUP_REDUCER, payload: data });
    } catch (e) {
        console.log(e);
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(CREATE_PROPERTY, addProperty),
        takeEvery(LOGIN, loginUser),
        takeEvery(SIGNUP, signupUser),
    ]);
}
