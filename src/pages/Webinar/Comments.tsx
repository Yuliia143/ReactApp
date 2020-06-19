import React, { useEffect, useState } from "react";
import { Comment } from "semantic-ui-react";
import styles from "./Webinar.module.css";
import RenderComments from "./RenderComments";
import { CommentI } from "./Interfaces";

interface allComments {
  socketId: string;
}

export default function ({ socket }: any) {
  const [comments, setComments] = useState<CommentI[]>([]);

  const addNewComment = (comment: CommentI) => {
    setComments((prevComments) => {
      if (!prevComments.find((item) => item.id === comment.id)) {
        return [...prevComments, comment];
      }
      return prevComments;
    });
  };

  useEffect(() => {
    socket.on("receive_all_comments", (data: allComments) => {
      socket.emit("send_all_comments", {
        to: data.socketId,
        comments,
      });
    });

    socket.on("new_comment", addNewComment);
    return () => {
      socket.off('receive_all_comments');
      socket.off('new_comment');
    }
  });

  return (
    <div className={styles.videoChatContainer}>
      <h2 className={styles.commentsTitle}>All comments</h2>
      <div className={styles.commentsVideoBlock}>
        <div className={styles.comments}>
          <Comment.Group>
            <RenderComments comments={comments} />
          </Comment.Group>
        </div>
      </div>
    </div>
  );
}
