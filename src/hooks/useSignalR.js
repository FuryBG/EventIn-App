import * as signalR from '@microsoft/signalr'
import { useEffect, useState } from 'react';
import React from 'react'


export default function useSignalR(pollGuid) {
    let [pollEventData, setPollEventData] = useState(null);

    useEffect(() => {
        connectToHub(pollGuid);
    }, []);

    return { data: pollEventData, onVote: () => onPollVote(connection) };

    function connectToHub(pollGuid) {
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7029/poll-event")
            .build();

        connection.start()
            .then(() => {
                connection.invoke("JoinRoom", pollGuid);
                connection.on("PollVote", (data) => onUpdateData(data));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onPollVote(pollVote, pollGuid) {

    }

    function onUpdateData(data) {
        setPollEventData(data);
    }
}