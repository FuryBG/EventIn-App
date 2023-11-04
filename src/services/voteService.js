import axios from "../lib/axios";

function resetVotes(pollId) {
    return axios.get(`/pollvote/resetvotes?pollEventId=${pollId}`).then(result => result.data);
}

export {
    resetVotes
}
