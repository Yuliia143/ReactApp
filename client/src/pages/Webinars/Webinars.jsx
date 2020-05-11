import React, {useState, useEffect} from 'react';
import {socket} from "../../App";
import styles from './Webinars.module.css';
import {Comment, Header} from "semantic-ui-react";
import {RTC_CONFIG} from "../../config";
import CommentForm from "./CommentForm";

const {RTCPeerConnection, RTCSessionDescription} = window;
const peerConnection = new RTCPeerConnection(RTC_CONFIG);

export default function () {

    peerConnection.ontrack = event => {
        const remoteVideo = document.getElementById("remote-video");
        if (remoteVideo) {
            remoteVideo.srcObject = event.streams[0];
            remoteVideo.onloadedmetadata = e => {
                remoteVideo.play();
            };
        }
    };

    useEffect(() => {

        socket.emit('new_user_joined', '');

        socket.on("candidate", (id, candidate) => {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch(e => console.error(e));
        });


        socket.on('offer-made', async data => {

            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(data.offer)
            );

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

            socket.emit("make-answer", {
                answer,
                to: data.socket
            });

            /*peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    socket.emit("candidate", data.socket, event.candidate);
                }
            };*/

        });

    });

    return (
        <div id='video' className={styles.videoContainer}>
            <video autoplay muted id='remote-video' className={styles.remoteVideo}></video>
            <Comment.Group className={styles.commentsGroup}>
                <Header as="h3" dividing className={styles.commentTitle}>
                    Comments
                </Header>
                <div className="commentCard">
                </div>
                <CommentForm/>
            </Comment.Group>
        </div>
    )

}