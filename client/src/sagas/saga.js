import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    FETCH_PROPERTIES,
    FETCH_PROPERTIES_REDUCER,
    FETCH_PROPERTY,
    FETCH_PROPERTY_REDUCER,
    SIGNUP,
    LOGIN,
    LOGIN_REDUCER,
    SIGNUP_REDUCER,
    CREATE_PROPERTY,
    CREATE_PROPERTY_REDUCER,
} from '../actions/types';

import { fetchProperties } from './fetchProperties';
import { fetchProperty } from './fetchProperty';
import { makeProperty } from './makeProperty';
import loginCall from './loginCall';
import signupCall from './signupCall';

function* getAllProperties() {
    try {
        const data = yield call(fetchProperties);
        yield put({ type: FETCH_PROPERTIES_REDUCER, payload: data });
    } catch (e) {
        console.log(e);
    }
}

function* getProperty({ payload }) {
    try {
        const data = yield call(fetchProperty, payload);
        yield put({ type: FETCH_PROPERTY_REDUCER, payload: data });
    } catch (e) {
        console.log(e);
    }
}

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
        takeEvery(FETCH_PROPERTIES, getAllProperties),
        takeEvery(FETCH_PROPERTY, getProperty),
        takeEvery(CREATE_PROPERTY, addProperty),
        takeEvery(LOGIN, loginUser),
        takeEvery(SIGNUP, signupUser),
    ]);
}
