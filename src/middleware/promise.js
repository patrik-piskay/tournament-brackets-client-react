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

export default function promiseMiddleware({ dispatch }) {
    return next => action => {
        const { promise, type, ...rest } = action;
        if (!promise) {
            return next(action);
        }

        const onRequest = type + '_REQUEST_TRIGGERED';
        const onSuccess = type + '_REQUEST_SUCCESS';
        const onFailure = type + '_REQUEST_FAILURE';

        dispatch({ type: onRequest, ...rest });

        promise
            .then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                dispatch({ type: onSuccess, result, ...rest });
            })
            .catch((error) => {
                dispatch({ type: onFailure, error: error.response, ...rest });
            });
    };
}