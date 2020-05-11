import React, {useEffect} from 'react';
import styles from './Webinar.module.css';
import {socket} from "../../App";
import {RTC_CONFIG} from "../../config";
import {Button} from "semantic-ui-react";
import {updateUserList, peerUpdating} from "./updateUserList";
import {PeerConnection, User, Data, Candidate, Navigator} from "./Interfaces";

const peerConnections: PeerConnection = {};

export default function () {

    useEffect(() => {

        navigator.getUserMedia(
            {video: true, audio: true},
            stream => {
                const localVideo = document.getElementById('local-video') as HTMLVideoElement;
                if (localVideo) {
                    localVideo.srcObject = stream;
                }
            },
            error => {
                console.error(error.message);
            }
        );

        socket.on("update-user-list", (user: User) => {
            const peerConnection = new RTCPeerConnection(RTC_CONFIG);
            peerConnections[user.id] = peerConnection;

            const videoElement = document.getElementById('local-video') as HTMLVideoElement;
            const stream = videoElement.srcObject as MediaStream;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            peerUpdating(peerConnection, user.id);

            updateUserList(user.id);
        });

        socket.on("remove-user", (user: User) => {
            const elToRemove = document.getElementById(user.id);
            if (elToRemove) {
                elToRemove.remove();
            }
        });

        socket.on("answer-made", async (data: Data) => {
            peerConnections[data.socket].setRemoteDescription(data.answer);
        });

    });

    return (
        <div>
            <div className={styles.activeUsersPanel} id="active-user-container">
                <h3 className={styles.panelTitle}>Active Users:</h3>
            </div>
            <div className={styles.cameraAndButton}>
                <video autoPlay muted className={styles.webCamera} id="local-video"></video>
                <Button className='negative ui button' id={styles.btn}>Stop webinar now</Button>
            </div>
        </div>
    )
}