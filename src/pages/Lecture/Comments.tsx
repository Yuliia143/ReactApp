import React, { useState, useEffect } from "react";
import { Comment, Header } from "semantic-ui-react";
import socketIoClient from "socket.io-client";
import { BASE_URL } from "../../config";
import CommentForm from "./CommentForm";
import { RenderComments } from "./RenderComments";
import "./Lecture.css";
import { Comment as CommentI } from "./modules";

const socket = socketIoClient(BASE_URL || "http://localhost:3030");

export default function Comments(props: {
  messages: CommentI[];
  lectureId: string;
}) {
  const { messages } = props;
  const [comments, setComments] = useState<CommentI[]>(messages);

  const leaveRoom = () => {
    socket.emit("Leave room", props.lectureId);
  };

  const addNewComment = (comment: CommentI) => {
    setComments((prevMessages) => {
      if (!prevMessages.find((item) => item._id === comment._id)) {
        return [...prevMessages, comment];
      }
      return prevMessages;
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", leaveRoom);
    socket.emit("join_room", props.lectureId);
    socket.on("send_message", addNewComment);
    return () => {
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, []);

  const { lectureId } = props;

  return (
    <Comment.Group id="commentGroup">
      <Header as="h3" dividing>
        Comments
      </Header>
      <div className="commentCard">
        <RenderComments comments={comments} />
      </div>
      <CommentForm lectureId={lectureId} onPostComment={addNewComment} />
    </Comment.Group>
  );
}
