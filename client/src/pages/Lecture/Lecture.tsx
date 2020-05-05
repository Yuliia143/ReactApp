import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import { getLecture, postComment } from "../../api/comments-api";
import CommentForm from "./CommentForm";
import { RenderComments } from "./RenderComments";
import "./Lecture.css";
import socketIoClient from "socket.io-client";
import { BASE_URL } from "../../config";
import Comments from "./Comments";
const socket = socketIoClient(BASE_URL || "http://localhost:3030");

interface Lection {
  id: string;
  videoUrl: string;
  description: string;
  title: string;
  messages: Comment[];
}

interface Comment {
  messageText: string;
  id: string;
  author: string;
  rating: number;
}

export default function Lecture(props: any) {
  const [lecture, setLecture] = useState<Lection>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLecture = async () => {
    const { match } = props;
    getLecture(match.params.id)
      .then((lecture: Lection) => {
        socket.emit("join_room", match.params.id);
        setLecture(lecture);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLecture();
    socket.on("New message received", (message: string) => {
      addNewComment(message);
    });
  });

  const onPostComment = (comment: string) => {
    addNewComment(comment);
    socket.emit("message", {
      room: props.match.params.id,
      message: comment,
    });
  };

  const addNewComment = (comment: Comment) => {
    setLecture((prevState) => {
      if (prevState) {
        return { ...prevState, messages: [...prevState.messages, comment] };
      }
    });
  };

  const lectureId = props.match.params.id;
  if (loading) return <h1 className="loading">Loading...</h1>;
  if (!lecture) return <h1>404 Not Found</h1>;
  return (
    <div>
      <div>
        <h1 className="comment-title">{lecture.title}</h1>
        <div className="video-container">
          <ReactPlayer
            className="video-item"
            url={lecture.videoUrl}
            controls="true"
            width="100%"
            height="450px"
          />
        </div>
        <div className="comment-description">
          This video is about: {lecture.description}
        </div>
      </div>
      <Comment.Group id="commentGroup">
        <Header as="h3" dividing>
          Comments
        </Header>
        <div className="commentCard">
          <RenderComments comments={lecture.messages || []} />
        </div>
        <CommentForm lectureId={lectureId} onPostComment={onPostComment} />
      </Comment.Group>
    </div>
  );
}
