const initialState = {
    loaderShown: false
};

export default function appState(state = initialState, action) {
    switch (action.type) {
        default:
            if (action.type.includes('_REQUEST_TRIGGERED')) {
                return {
                    ...state,
                    loaderShown: true
                };
            } else if (
                action.type.includes('_REQUEST_SUCCESS') ||
                action.type.includes('_REQUEST_FAILURE')
            ) {
                return {
                    ...state,
                    loaderShown: false
                };
            } else {
                return state;
            }
    }
}