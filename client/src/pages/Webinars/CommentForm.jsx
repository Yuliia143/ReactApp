import React, {useState, useEffect} from 'react';
import {Button, Form, Input} from "semantic-ui-react";
import styles from "./Webinars.module.css"

export default function(){

    const [comment, setComment] = useState('');

    const postComment = () => {

    }

    return(
        <Form className={styles.commentsForm}>
            <Form.TextArea
                value={comment}
                placeholder="Enter your comment"
                onChange={event => {
                    setComment(event.target.value);
                }}
            />
            <Button
                content="Add comment"
                onClick={postComment}
                labelPosition="left"
                icon="edit"
                disabled={!comment}
                positive
            />
        </Form>
    )
}