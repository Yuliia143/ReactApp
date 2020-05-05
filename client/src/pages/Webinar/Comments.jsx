import React from 'react';
import styles from './Webinar.module.css';
import WebCamera from "./WebCamera";
import StartWebinar from "./StartWebinar";

export default function (props) {
    return (
        <div className={styles.videoChatContainer}>
            <h2 className={styles.commentsTitle}>
                All comments
            </h2>
            <div className={styles.commentsVideoBlock}>
                <div className={styles.comments}></div>
                <StartWebinar/>
            </div>
        </div>
    )
}