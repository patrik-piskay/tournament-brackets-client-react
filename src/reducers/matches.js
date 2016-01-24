import * as actionTypes from 'actions';
import { succeed } from 'actions';

const initialState = {};

export default function matches(state = initialState, action) {
    let newState;

    switch (action.type) {
        case succeed(actionTypes.FETCH_TOURNAMENT_DETAIL):
            newState = {};

            action.result.matches.map((match) => {
                newState[match.id] = match;
            });

            return newState;

        case succeed(actionTypes.FETCH_MATCH_DETAIL):
            newState = {};

            const matchFetched = action.result;

            newState[matchFetched.id] = matchFetched;

            return newState;

        case succeed(actionTypes.SET_SCORE):
            newState = { ...state };

            const { match } = action.result;

            if (match) {
                newState[match.id] = match;
            }

            return newState;

        default:
            return state;
    }
}