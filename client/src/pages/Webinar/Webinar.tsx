import React from 'react';
import styles from './Webinar.module.css';
import StartWebinar from "./StartWebinar";

export default function () {
    return (
        <div className={styles.container}>
            <StartWebinar/>
        </div>
    )
}