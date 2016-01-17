import 'babel-polyfill';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import DevTools from 'containers/DevTools';
import configureStore from './store/configureStore';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <div>
            <h1>Hello world!</h1>
            <DevTools />
        </div>
    </Provider>
);

render(<App />, document.getElementById('app'));