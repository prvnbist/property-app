import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Property from './pages/Property';
import CreateProperty from './pages/CreateProperty';
import EditProperty from './pages/EditProperty';

import { store, persistor } from './store/store';

import './styles/index.scss';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/properties/:id" component={Property} />
                <Route path="/create" component={CreateProperty} />
                <Route path="/edit/:id" component={EditProperty} />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
