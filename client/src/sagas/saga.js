import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    REQUEST_PROPERTIES,
    RECIEVE_PROPERTIES,
    LOGIN_REQUEST,
    SIGNUP,
    LOGIN_TOKEN,
    SIGNUP_ERROR,
} from '../actions/types';

import { fetchProperties } from './fetchProperties';
import loginCall from './loginCall';
import signupCall from './signupCall';

function* getAllProperties() {
    try {
        const data = yield call(fetchProperties);
        yield put({ type: RECIEVE_PROPERTIES, payload: data });
    } catch (e) {
        console.log(e);
    }
}

function* loginUser(payload) {
    try {
        const data = yield call(loginCall, payload);
        yield put({ type: LOGIN_TOKEN, payload: data });
    } catch (e) {
        console.log(e);
    }
}

function* signupUser(payload) {
    try {
        const data = yield call(signupCall, payload);
        yield put({ type: SIGNUP_ERROR, payload: data });
    } catch (e) {
        console.log(e);
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(REQUEST_PROPERTIES, getAllProperties),
        takeEvery(LOGIN_REQUEST, loginUser),
        takeEvery(SIGNUP, signupUser),
    ]);
}
