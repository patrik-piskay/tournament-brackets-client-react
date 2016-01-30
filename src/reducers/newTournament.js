import * as actionTypes from 'actions';
import { succeed, failed } from 'actions';

const initialState = {
    name: '',
    players: '',
    errors : {}
};

export default function newTournament(state = initialState, action) {
    let errors;

    switch (action.type) {
        case actionTypes.CHANGE_FIELD_VALUE:
            errors = { ...state.errors };

            if (action.value) {
                delete errors[action.field];
            }

            return {
                ...state,
                [action.field]: action.value,
                errors
            };

        case actionTypes.NEW_TOURNAMENT_FORM_VALIDATION_ERROR:
            errors = {};

            action.errors.forEach((error) => {
                errors[error] = true;
            });

            return {
                ...state,
                errors
            };

        case succeed(actionTypes.CREATE_NEW_TOURNAMENT):
        case failed(actionTypes.CREATE_NEW_TOURNAMENT):
            return initialState;

        default:
            return state;
    }
}