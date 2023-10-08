import { useEffect, useState } from "react";
import { usetToastConext } from "../context/ToastContext";
import axios from "../lib/axios";

export const useFetch = (method, url, bodyData) => {
    const toastApi = usetToastConext();
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        axios({ method, url, bodyData })
        .then(result => {
            setData(result.data);
            setisLoading(false);
        })
        .catch(error => {
            setisLoading(false);
            setError(error);
            toastApi.setToaster({ severity: 'error', detail: 'Something went wrong, please try again later.' });
        });
    }, [url, shouldRefetch]);
    function reFetch() {
        setShouldRefetch({});
    }
    return [data, error, isLoading, reFetch]
};