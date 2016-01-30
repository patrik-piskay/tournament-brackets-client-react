import * as actionTypes from 'actions';
import { triggered } from 'actions';

const initialState = {
    setScoreFormVisible: false,
    error: null
};

export default function matchDetail(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_SET_SCORE_FORM_VISIBILITY:
            return {
                setScoreFormVisible: !state.setScoreFormVisible,
                error: initialState.error
            };

        case actionTypes.SET_SCORE_FORM_VALIDATION_ERROR:
            return {
                ...state,
                error: action.message
            };

        case triggered(actionTypes.SET_SCORE):
            return {
                ...state,
                error: initialState.error
            };

        default:
            return state;
    }
}