import React, {useState, useEffect} from 'react';
import styles from './Webinar.module.css';
import {socket, peerConnection, RTCSessionDescription} from '../../App';
import {Button, Input} from "semantic-ui-react";
import WebCamera from './WebCamera';

export default function () {

    const [startWebinar, setStartWebinar] = useState(false);
    const [webinareName, setWebinareName] = useState('');

    const showCamera = async  () => {
        await socket.emit('new_user_joined', '');

        setStartWebinar(true);
    }

    const textInputOnchange = e => {
        setWebinareName(e.target.value);
    }

    if (startWebinar === true) {
        return (
            <WebCamera/>
        )
    } else {
        return (
            <div className={styles.startWebinar}>
                <Input type='text' className={styles.webinarName} placeholder='Webinar name' value={webinareName}
                       onChange={textInputOnchange}/>
                <Button disabled={!webinareName} className="ui inverted green button" onClick={showCamera}>
                    Start new webinar
                </Button>
            </div>
        )
    }

}