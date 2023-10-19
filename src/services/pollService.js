import axios from "../lib/axios";

function getUserPolls() {
    return axios.get("/poll/getalluserpolls").then(result => result.data);
}
function getPollByGuid(guid) {
    return axios.get("/poll/getpollbyguid?id=" + guid).then(result => result.data);
}
function getPollById(id) {
    return axios.get("/poll/getpollbyid?id=" + id).then(result => result.data);
}
function createPoll(data) {
    return axios.post("/poll/createpoll", data).then(result => result.data);
}
function updatePoll(data) {
    return axios.post("/poll/updatepoll", data);
}
function deletePoll(pollId) {
    return axios.post("/poll/deletepoll?pollId=" + pollId);
}

export {
    getUserPolls,
    getPollByGuid,
    createPoll,
    updatePoll,
    deletePoll,
    getPollById
}
