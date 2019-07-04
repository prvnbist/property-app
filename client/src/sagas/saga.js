import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    SIGNUP,
    LOGIN,
    AUTH_REDUCER,
    CREATE_PROPERTY,
    EDIT_PROPERTY,
} from '../actions/types';

import { makeProperty } from './makeProperty';
import { updateProperty } from './updateProperty';
import loginCall from './loginCall';
import signupCall from './signupCall';

function* addProperty({ payload }) {
    try {
        yield call(makeProperty, payload);
    } catch (e) {
        console.log(e);
    }
}

function* editProperty({ payload }) {
    try {
        yield call(updateProperty, payload);
    } catch (e) {
        console.log(e);
    }
}

function* loginSaga(payload) {
    try {
        const data = yield call(loginCall, payload);
        yield put({ type: AUTH_REDUCER, payload: data });
    } catch (e) {
        console.log(e);
    }
}
function* signupSaga(payload) {
    try {
        const data = yield call(signupCall, payload);
        yield put({ type: AUTH_REDUCER, payload: data });
    } catch (e) {
        console.log(e);
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(CREATE_PROPERTY, addProperty),
        takeEvery(EDIT_PROPERTY, editProperty),
        takeEvery(LOGIN, loginSaga),
        takeEvery(SIGNUP, signupSaga),
    ]);
}
