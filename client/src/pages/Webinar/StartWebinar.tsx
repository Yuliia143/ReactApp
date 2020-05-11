import React, {useState} from 'react';
import styles from './Webinar.module.css';
import {Button, Input} from "semantic-ui-react";
import UsersAndCamera from './UsersAndCamera';
import Comments from "./Comments";

export default function () {

    const [startWebinar, setStartWebinar] = useState(false);
    const [webinareName, setWebinareName] = useState('');

    const showCamera = () => {
        setStartWebinar(true);
    }

    const textInputOnchange = (e: {target: HTMLInputElement}) => {
        setWebinareName(e.target.value);
    }

    if (startWebinar === true) {
        return (
            <div className={styles.container}>
                <UsersAndCamera/>
                <Comments/>
            </div>
        )
    } else {
        return (
            <div className={styles.startWebinar}>
                <Input type='text' className={styles.webinarName} placeholder='Webinar name' value={webinareName}
                       onChange={textInputOnchange}/>
                <Button disabled={!webinareName} className="ui teal button" onClick={showCamera}>
                    Start new webinar
                </Button>
            </div>
        )
    }

}