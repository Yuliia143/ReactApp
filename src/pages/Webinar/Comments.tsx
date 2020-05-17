import React from 'react';
import styles from './Webinar.module.css';

export default function () {
    return (
        <div className={styles.videoChatContainer}>
            <h2 className={styles.commentsTitle}>
                All comments
            </h2>
            <div className={styles.commentsVideoBlock}>
                <div className={styles.comments}></div>
            </div>
        </div>
    )
}