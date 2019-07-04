import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    SIGNUP,
    LOGIN,
    AUTH,
    CREATE_PROPERTY,
    EDIT_PROPERTY,
    DELETE_PROPERTY,
} from '../actions/types';

import { makeProperty } from './makeProperty';
import { updateProperty } from './updateProperty';
import { removeProperty } from './removeProperty';
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

function* deleteProperty({ payload }) {
    try {
        yield call(removeProperty, payload);
    } catch (e) {
        console.log(e);
    }
}

function* loginSaga(payload) {
    try {
        const data = yield call(loginCall, payload);
        yield put({ type: AUTH, payload: data });
    } catch (e) {
        console.log(e);
    }
}
function* signupSaga(payload) {
    try {
        const data = yield call(signupCall, payload);
        yield put({ type: AUTH, payload: data });
    } catch (e) {
        console.log(e);
    }
}

export default function* watchAll() {
    yield all([
        takeEvery(CREATE_PROPERTY, addProperty),
        takeEvery(EDIT_PROPERTY, editProperty),
        takeEvery(DELETE_PROPERTY, deleteProperty),
        takeEvery(LOGIN, loginSaga),
        takeEvery(SIGNUP, signupSaga),
    ]);
}
