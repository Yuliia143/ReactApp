import React, {useState, useEffect} from 'react';
import {socket, peerConnection, RTCSessionDescription} from "../../App";
import styles from './Webinars.module.css';

export default function () {

    peerConnection.ontrack = function ({streams: [stream]}) {
        console.log(stream);
        const remoteVideo = document.getElementById("remote-video");
        if (remoteVideo) {
            alert('nice');
            remoteVideo.srcObject = stream;
        }
    };

    useEffect(() => {

        socket.emit('new_user_joined', '');

        socket.on('offer-made', async data => {
            console.log(data);
            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(data.offer)
            );
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

            socket.emit("make-answer", {
                answer,
                to: data.socket
            });

        });

        socket.on("answer-made", async data => {
            console.log(data);
            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(data.answer)
            );
        });

    });

    return (
        <div id='video'>
            <video autoplay id='remote-video' height='300px' width='300px'>

            </video>
        </div>
    )

}