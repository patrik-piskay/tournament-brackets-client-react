const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return response.json().then((data) => {
            let error = new Error(response.statusText);
            error.response = data;
            throw error;
        });
    }
};

const parseJSON = (response) => response.json();

export default function promiseMiddleware({ dispatch, getState }) {
    return next => action => {
        const { promise, onRequest, onSuccess, onFailure, ...rest } = action;
        if (!promise) {
            return next(action);
        }

        if (typeof onRequest === 'function') {
            onRequest(dispatch, getState, ...rest);
        } else {
            dispatch({ type: onRequest, ...rest });
        }

        promise
            .then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (typeof onSuccess === 'function') {
                    onSuccess(result, dispatch, getState, ...rest);
                } else {
                    dispatch({ type: onSuccess, result, ...rest });
                }
            })
            .catch((error) => {
                if (typeof onFailure === 'function') {
                    onFailure(error.response, dispatch, getState, ...rest);
                } else {
                    dispatch({ type: onFailure, error: error.response, ...rest });
                }
            });
    };
}