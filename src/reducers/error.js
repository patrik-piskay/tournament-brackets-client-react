import * as actionTypes from 'actions';

const initialState = null;

export default function error(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESET_ERROR:
            return initialState;

        default:
            if (action.type.includes('_REQUEST_FAILURE')) {
                return action.error && action.error.err || 'Something went wrong';
            } else if (
                action.type.includes('_REQUEST_TRIGGERED') ||
                action.type.includes('_REQUEST_SUCCESS')
            ) {
                return initialState;
            } else {
                return state;
            }
    }
}