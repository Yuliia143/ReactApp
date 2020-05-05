import React, {useState, useEffect} from 'react';
import styles from './Webinar.module.css';
import {socket, peerConnection, RTCSessionDescription} from '../../App';
import {Button} from "semantic-ui-react";

export default function () {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.getUserMedia(
            {video: true, audio: true},
            stream => {
                //setLoading(false);
                console.log(323);
                const localVideo = document.getElementById('local-video');
                if (localVideo) {
                    localVideo.srcObject = stream;
                }
                stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            },
            error => {
                console.error(error.message);
            }
        );
    });

    const stopWebinar = () => {
        socket.emit('stop_webinar', socket.id);
    }

    return (
        <div className={styles.cameraAndButton}>
            <video autoPlay muted className={styles.webCamera} id="local-video"></video>
            <Button className='negative ui button' id={styles.btn} onClick={stopWebinar}>Stop webinar now</Button>
        </div>
    )

    /*if (loading === true) {
        return (
            <div className={styles.startWebinar}>
                <h3>
                    Loading...
                </h3>
            </div>
        )
    } else {
        return (
            <div className={styles.cameraAndButton}>
                <video autoPlay muted className={styles.webCamera} id="local-video"></video>
                <Button className='negative ui button' id={styles.btn} onClick={stopWebinar}>Stop webinar now</Button>
            </div>
        )
    }*/
}