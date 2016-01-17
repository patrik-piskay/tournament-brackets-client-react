import { createStore, applyMiddleware, compose } from 'redux';

import promiseMiddleware from 'middleware/promise';
import rootReducer from '../reducers';

import DevTools from '../containers/DevTools';

const finalCreateStore = compose(
    applyMiddleware(
        promiseMiddleware
    ),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    /* eslint-disable no-undef */
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    /* eslint-enable */

    return store;
}
