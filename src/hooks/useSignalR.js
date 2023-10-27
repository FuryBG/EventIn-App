import * as signalR from '@microsoft/signalr'
import { useEffect, useState } from 'react'

let connection = new signalR.HubConnectionBuilder()
.withUrl("https://localhost:7029/poll-event")
.build();

export default function useSignalR({pollGuid, onDataReceive}) {
    let [pollEventData, setPollEventData] = useState();

    useEffect(() => {
        connectToHub(pollGuid);
        return () => {
            connection.stop();
        }
    }, []);

    return { data: pollEventData, onVote: onPollVote };

    async function connectToHub(pollGuid) {
        try {
            await connection.start();
            connection.invoke("JoinRoom", pollGuid);
            connection.on("PollVote", (data) => onUpdateData(data));
        }
        catch(err) {
            console.log(err);
        }
    }

    function onPollVote(pollVote) {
        connection.invoke("PollVote", pollVote, pollGuid);
    }

    function onUpdateData(data) {
        setPollEventData(data);
        if(onDataReceive) {
            onDataReceive(data);
        }
    }
}