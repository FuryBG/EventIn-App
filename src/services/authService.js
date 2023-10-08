import axios from "../lib/axios";

function getUserDetails() {
    return axios.get("account/getUser");
}

function login(data) {
    return axios.post("account/login", data);
}

function logout() {
    return axios.get("account/logout");
}

export {
    getUserDetails,
    login,
    logout
}