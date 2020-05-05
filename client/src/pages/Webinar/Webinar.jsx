import React from 'react';
import styles from './Webinar.module.css';
import UserList from './UserList';
import Comments from "./Comments";

export default function(props){
    return (
        <div className={styles.container}>
            <UserList/>
            <Comments/>
        </div>
    )
}