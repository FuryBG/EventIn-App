import axios from "axios";

export default axios.create({
    baseURL: "https://192.168.0.131:7029/",
    timeout: 5000,
    withCredentials: true,
});