import * as actionTypes from 'actions';
import { succeed } from 'actions';

const initialState = {};

export default function tournaments(state = initialState, action) {
    let newState;

    switch (action.type) {
        case succeed(actionTypes.FETCH_TOURNAMENTS):
            newState = {};

            action.result.map((tournament) => {
                newState[tournament.id] = tournament;
            });

            return newState;

        case succeed(actionTypes.FETCH_TOURNAMENT_DETAIL):
            newState = { ...state };

            newState[action.result.tournament.id] = action.result.tournament;

            return newState;

        default:
            return state;
    }
}