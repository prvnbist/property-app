import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    FETCH_PROPERTIES,
    SIGNUP,
    LOGIN,
    LOGIN_REDUCER,
    SIGNUP_REDUCER,
} from '../actions/types';

import { fetchProperties } from './fetchProperties';
import loginCall from './loginCall';
import signupCall from './signupCall';

function* getAllProperties() {
    try {
        const data = yield call(fetchProperties);
        yield put({ type: FETCH_PROPERTIES, payload: data });
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
        takeEvery(FETCH_PROPERTIES, getAllProperties),
        takeEvery(LOGIN, loginUser),
        takeEvery(SIGNUP, signupUser),
    ]);
}
