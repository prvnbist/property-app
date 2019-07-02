import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import store from './store/store';

import './styles/index.scss';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
