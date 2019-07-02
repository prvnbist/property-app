import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    REQUEST_PROPERTIES,
    LOGIN_REQUEST,
    SIGNUP,
} from '../actions/types';
import { recieveProperties, loginToken } from '../actions/creators';

import { fetchProperties } from './fetchProperties';
import loginCall from './loginCall';
import signUpCall from './signupCall';

function* getAllProperties() {
    try {
        const data = yield call(fetchProperties);
        yield put(recieveProperties(data));
    } catch (e) {
        console.log(e);
    }
}

function* loginUser(payload) {
    try {
        const data = yield call(loginCall, payload);
        yield put(loginToken(data));
    } catch (e) {
        console.log(e);
    }
}

function* signupUser(payload) {
    try {
        const data = yield call(loginCall, payload);
        yield put(loginToken(data));
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
