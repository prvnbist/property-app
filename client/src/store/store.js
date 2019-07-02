import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from '../reducers/index';
import mySaga from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducers,
    composeEnhancer(applyMiddleware(sagaMiddleware)),
);

// then run the saga
sagaMiddleware.run(mySaga);
export default store;
