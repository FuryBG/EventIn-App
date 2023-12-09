import axios from "../lib/axios";

const loginUrl = "https://localhost:7029/account/login";
const registerUrl = "https://localhost:7029/account/register";

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
    logout,
    loginUrl,
    registerUrl
}