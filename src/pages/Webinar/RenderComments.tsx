import React from "react";
import { Comment } from "semantic-ui-react";
import { CommentI } from "./Interfaces";
import styles from "./Webinar.module.css";

export default function ({ comments }: { comments: CommentI[] }) {
  return (
    <div>
      {comments.map((item) => {
        return (
          <Comment key={item.id}>
            <Comment.Avatar src={item.userImage} id={styles.userAvatar} />
            <Comment.Author id={styles.author}> {item.author}</Comment.Author>
            <Comment.Content>
              <Comment.Metadata>
                {/* <div id={styles.date}>
                                    {item.date}
                                </div> */}
              </Comment.Metadata>
              <Comment.Text id={styles.commentText}>
                {item.commentText}
              </Comment.Text>
            </Comment.Content>
          </Comment>
        );
      })}
    </div>
  );
}
