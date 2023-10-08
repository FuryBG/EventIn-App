import { useState } from "react";
import { usetToastConext } from "../context/ToastContext";
import axios from "../lib/axios";

export const useFetcher = (method, url, message) => {
    const toastApi = usetToastConext();
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    function fetchCallback(bodyData) {
        axios({method: method, url: url, data: bodyData})
        .then(result => {
            setData(result.data);
            setisLoading(false);
            if(message) {
                toastApi.setToaster({ severity: 'success', detail: message });
            }
        })
        .catch(error => {
            setisLoading(false);
            setError(error);
            toastApi.setToaster({ severity: 'error', detail: 'Something went wrong, please try again later.' });
        });
    };

    function reFetch() {
        setShouldRefetch({});
    }

    return [data, error, isLoading, fetchCallback, reFetch]
};