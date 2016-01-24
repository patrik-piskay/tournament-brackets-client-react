import { combineReducers } from 'redux';

import appState from './appState';
import tournaments from './tournaments';
import rounds from './rounds';
import matches from './matches';
import matchDetail from './matchDetail';

const rootReducer = combineReducers({
    appState,
    tournaments,
    rounds,
    matches,
    matchDetail
});

export default rootReducer;
