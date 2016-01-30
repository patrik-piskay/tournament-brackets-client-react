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
        const { promise, type, onSuccess, ...rest } = action;
        if (!promise) {
            return next(action);
        }

        const triggered = type + '_REQUEST_TRIGGERED';
        const success = type + '_REQUEST_SUCCESS';
        const failure = type + '_REQUEST_FAILURE';

        dispatch({ type: triggered, ...rest });

        promise
            .then(checkStatus)
            .then(parseJSON)
            .then((result) => {
                if (onSuccess) {
                    onSuccess(result);
                }

                dispatch({ type: success, result, ...rest });
            })
            .catch((error) => {
                dispatch({ type: failure, error: error.response, ...rest });
            });
    };
}