import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import history from 'utils/history';
import { resetError } from 'actions';
import DevTools from 'containers/DevTools';
import configureStore from './store/configureStore';
import TournamentBrackets from 'containers/RootApp/TournamentBrackets';

const store = configureStore();

history.listen(() => {
    // reset error message on route change
    store.dispatch(resetError());
});

const App = () => (
    <Provider store={store}>
        <div>
            <TournamentBrackets />
            <DevTools />
        </div>
    </Provider>
);

render(<App />, document.getElementById('app'));