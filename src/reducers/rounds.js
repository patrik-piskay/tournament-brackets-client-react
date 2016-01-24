import * as actionTypes from 'actions';
import { succeed } from 'actions';

const initialState = {
    rounds: [],
    currentRoundBeingPlayed: 0
};

const devideMatchesToRounds = (matches, rounds = [], roundId = null, level = 0) => {
    const newRound = [];

    const restMatches = matches.filter((match) => {
        if (match.next_round_id === roundId) {
            newRound.push(match.id);

            return false;
        } else {
            return true;
        }
    });

    if (newRound.length > 0) {
        rounds[level] = (rounds[level] && rounds[level].concat(newRound)) || newRound;

        newRound.forEach((matchId) => {
            devideMatchesToRounds(restMatches, rounds, matchId, level + 1);
        });
    }

    return rounds;
};

const getCurrentRound = (rounds, matches) => {
    let currentRound = 0;
    let currentRoundFound = false;
    let _matches = {};

    matches.forEach((match) => {
        _matches[match.id] = match;
    });

    rounds.forEach((round, index) => {
        if (!currentRoundFound) {
            currentRound = index;
        }

        round.forEach((matchId) => {
            if (!currentRoundFound && _matches[matchId].played_at === null) {
                currentRoundFound = true;
            }
        });
    });

    return currentRound;
};

export default function matches(state = initialState, action) {
    switch (action.type) {
        case succeed(actionTypes.FETCH_TOURNAMENT_DETAIL):
            const rounds = devideMatchesToRounds(action.result.matches).reverse();

            const currentRound = getCurrentRound(rounds, action.result.matches);

            return {
                rounds: rounds,
                currentRoundBeingPlayed: currentRound
            };

        default:
            return state;
    }
}