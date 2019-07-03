import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware)),
);
export const persistor = persistStore(store);

// then run the saga
sagaMiddleware.run(rootSaga);
