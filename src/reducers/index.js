import { combineReducers } from 'redux';

import appState from './appState';
import tournaments from './tournaments';
import matches from './matches';

const rootReducer = combineReducers({
    appState,
    tournaments,
    matches
});

export default rootReducer;
