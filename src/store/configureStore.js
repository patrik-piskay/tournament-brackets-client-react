import { createStore, applyMiddleware, compose } from 'redux';

import promiseMiddleware from 'middleware/promise';
import rootReducer from '../reducers';

import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(
            promiseMiddleware
        ),
        DevTools.instrument()
    ));

    /* eslint-disable no-undef */
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }
    /* eslint-enable */

    return store;
}
