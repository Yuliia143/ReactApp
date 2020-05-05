import React, { useState, useEffect } from "react";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import { RenderComments } from "./RenderComments";
import "./Lecture.css";
import socketIoClient from "socket.io-client";
import { BASE_URL } from "../../config";

const socket = socketIoClient(BASE_URL || "http://localhost:3030");

export default function Comments(props) {
  const [messages, setMessages] = useState([]);

  const leave_room = () => {
    socket.emit("Leave room", props.lectureId);
  };

  useEffect(() => {
    setMessages(props.messages);
    window.addEventListener("beforeunload", leave_room);
    socket.emit("join_room", props.lectureId);
    socket.on("send_message", addNewComment);
    return () => {
      window.removeEventListener("beforeunload", leave_room);
    };
  });

  const addNewComment = (comment) => {
    setMessages((prevState) => {
      const prevMessages = prevState.messages;
      if (!prevMessages.find((item) => item._id === comment._id)) {
        console.log("add comment", comment);
        return { messages: [...prevState.messages, comment] };
      }
      return {};
    });
  };

  return (
    <Comment.Group id="commentGroup">
      <Header as="h3" dividing>
        Comments
      </Header>
      <div className="commentCard">
        <RenderComments comments={messages || []} />
      </div>
      <CommentForm lectureId={props.lectureId} onPostComment={addNewComment} />
    </Comment.Group>
  );
}
