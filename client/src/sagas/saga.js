import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { REQUEST_PROPERTIES } from '../actions/types';
import { recieveProperties } from '../actions/creators';
import { fetchData } from './fetchData';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
    try {
        // do api call
        const data = yield call(fetchData);
        yield put(recieveProperties(data));
    } catch (e) {
        console.log(e);
    }
}

export default function* mySaga() {
    yield takeLatest(REQUEST_PROPERTIES, getApiData);
}
