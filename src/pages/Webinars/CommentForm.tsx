import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import styles from './Webinars.module.css';
import { CommentI } from "../Webinar/Interfaces";
import { checkUserImage} from "./checkUserImage.";

export default function (props: {
    creator: string;
    onPostComment: (comment: CommentI) => any;
    socket: any;
}) {
    const [comment, setComment] = useState<string>('');

    const { creator, onPostComment, socket } = props;

    const generateId = (): string => {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    };

    const sendComment = () => {
        const userStr = localStorage.getItem('User') as string;
        const { _id, name, surName, imageUrl } = JSON.parse(userStr);

        const message: CommentI = {
            id: generateId(),
            commentText: comment,
            author: `${name} ${surName}`,
            authorId: _id,
            userImage: checkUserImage(imageUrl)
        };

        socket.emit('new_comment', creator, message);
        setComment('');
        message.author = 'Me';
        onPostComment(message);
    };

    const changeText = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setComment(event.currentTarget.value);
    };

    return (
        <Form className={styles.commentsForm}>
            <Form.TextArea
                id={styles.commentArea}
                value={comment}
                placeholder="Enter your comment"
                onChange={(event) => changeText(event)}
            />
            <Button
                content="Add comment"
                onClick={sendComment}
                labelPosition="left"
                icon="edit"
                disabled={!comment}
                positive
            />
        </Form>
    );
}
