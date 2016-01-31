import { combineReducers } from 'redux';

import appState from './appState';
import tournaments from './tournaments';
import rounds from './rounds';
import matches from './matches';
import matchDetail from './matchDetail';
import newTournament from './newTournament';
import error from './error';

const rootReducer = combineReducers({
    appState,
    tournaments,
    rounds,
    matches,
    matchDetail,
    newTournament,
    error
});

export default rootReducer;
