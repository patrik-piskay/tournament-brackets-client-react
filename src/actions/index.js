import fetch from 'services/http';
import history from 'utils/history';

const API_ENDPOINT = 'http://localhost:3000';

export function triggered(type) {
    return type + '_REQUEST_TRIGGERED';
}
export function succeed(type) {
    return type + '_REQUEST_SUCCESS';
}
export function failed(type) {
    return type + '_REQUEST_FAILURE';
}

export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS';

export function fetchTournaments() {
    const promise = fetch(`${API_ENDPOINT}/tournaments`);

    return {
        type: FETCH_TOURNAMENTS,
        promise
    };
}

export const FETCH_TOURNAMENT_DETAIL = 'FETCH_TOURNAMENT_DETAIL';

export function fetchTournamentDetail(tournamentId) {
    const promise = fetch(`${API_ENDPOINT}/tournament/${tournamentId}`);

    return {
        type: FETCH_TOURNAMENT_DETAIL,
        promise
    };
}

export const FETCH_MATCH_DETAIL = 'FETCH_MATCH_DETAIL';

export function fetchMatchDetail(matchId) {
    const promise = fetch(`${API_ENDPOINT}/match/${matchId}`);

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

export const SET_SCORE_FORM_VALIDATION_ERROR = 'SET_SCORE_FORM_VALIDATION_ERROR';
export const SET_SCORE = 'SET_SCORE';

export function setScore(matchId, player1_score, player2_score) {
    if (player1_score === player2_score) {
        return {
            type: SET_SCORE_FORM_VALIDATION_ERROR,
            message: 'Match can not end in a draw, it has to have a winner'
        };
    } else {
        const promise = fetch(`${API_ENDPOINT}/match/${matchId}/set-score`, {
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

export const CHANGE_FIELD_VALUE = 'CHANGE_FIELD_VALUE';

export function changeValue(field, value) {
    return {
        type: CHANGE_FIELD_VALUE,
        field,
        value
    };
}

export const NEW_TOURNAMENT_FORM_VALIDATION_ERROR = 'NEW_TOURNAMENT_FORM_VALIDATION_ERROR';
export const CREATE_NEW_TOURNAMENT = 'CREATE_NEW_TOURNAMENT';

const parsePlayers = (playersString) => {
    return playersString
        .split(',')
        .map((player) => player.trim())
        .filter((player) => player);
};

const validateCreateNewTournamentForm = (name, players) => {
    const errors = [];

    if (!name) {
        errors.push('name');
    }

    if (!players || players.length < 2) {
        errors.push('players');
    }

    return errors;
};

export function createNewTournament(name, players) {
    const playersArray = parsePlayers(players);
    const errors = validateCreateNewTournamentForm(name, playersArray);

    if (errors.length > 0) {
        return {
            type: NEW_TOURNAMENT_FORM_VALIDATION_ERROR,
            errors
        };
    } else {
        const promise = fetch(`${API_ENDPOINT}/tournament`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.trim(),
                players: playersArray
            })
        });

        return {
            type: CREATE_NEW_TOURNAMENT,
            promise,
            onSuccess: (result) => {
                history.pushState(null, `/tournament/${result.tournament.id}`);
            }
        };
    }
}

export const RESET_ERROR = 'RESET_ERROR';

export function resetError() {
    return {
        type: RESET_ERROR
    };
}