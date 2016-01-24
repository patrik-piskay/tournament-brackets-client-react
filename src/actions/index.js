import fetch from 'services/http';

export function triggered(type) {
    return type + '_REQUEST_TRIGGERED';
}
export function succeed(type) {
    return type + '_REQUEST_SUCCESS';
}
export function failed(type) {
    return type + '_REQUEST_FAILURE';
}

export const FETCH_ACTIVE_TOURNAMENTS = 'FETCH_ACTIVE_TOURNAMENTS';

export function fetchActiveTournaments() {
    const promise = fetch('http://localhost:3000/get-tournaments');

    return {
        type: FETCH_ACTIVE_TOURNAMENTS,
        promise
    };
}

export const FETCH_TOURNAMENT_DETAIL = 'FETCH_TOURNAMENT_DETAIL';

export function fetchTournamentDetail(tournamentId) {
    const promise = fetch('http://localhost:3000/get-tournament/' + tournamentId);

    return {
        type: FETCH_TOURNAMENT_DETAIL,
        promise
    };
}

export const FETCH_MATCH_DETAIL = 'FETCH_MATCH_DETAIL';

export function fetchMatchDetail(matchId) {
    const promise = fetch('http://localhost:3000/get-match/' + matchId);

    return {
        type: FETCH_MATCH_DETAIL,
        promise
    };
}

export const TOGGLE_SET_SCORE_FORM_VISIBILITY = 'TOGGLE_SET_SCORE_FORM_VISIBILITY';

export function toggleSetScoreFormVisibility() {
    return {
        type: TOGGLE_SET_SCORE_FORM_VISIBILITY
    };
}

export const FORM_VALIDATION_ERROR = 'FORM_VALIDATION_ERROR';
export const SET_SCORE = 'SET_SCORE';

export function setScore(matchId, player1_score, player2_score) {
    if (player1_score === player2_score) {
        return {
            type: FORM_VALIDATION_ERROR,
            message: 'Match can not end in a draw, it has to have a winner'
        };
    } else {
        const promise = fetch(`http://localhost:3000/set-score/${matchId}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player1_score,
                player2_score
            })
        });

        return {
            type: SET_SCORE,
            promise
        };
    }

}