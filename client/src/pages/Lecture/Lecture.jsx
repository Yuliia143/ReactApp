import React from "react";
import ReactPlayer from "react-player";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import axios from "axios";
import { getLecture, postComment } from "../../api/comments-api";
import CommentForm from "./CommentForm";
import { RenderComments } from "./RenderComments";
import "./Lecture.css";
import socketIoClient from "socket.io-client";
import {BASE_URL} from "../../config";

const socket = socketIoClient(BASE_URL || 'http://localhost:3030');


export default class Lecture extends React.Component {
  state = {
    lecture: null,
    loading: true,
  };


fetchLecture = async () => {
    const { match } = this.props;
    getLecture(match.params.id)
      .then((lecture) => {
          socket.emit('join_room', match.params.id);
        this.setState({
          lecture,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.fetchLecture();
      socket.on('New message received', message => {
          this.addNewComment(message);
      });
  }
  onPostComment = (comment) => {
      this.addNewComment(comment);
      socket.emit('message', {room:this.props.match.params.id, message:comment});
  }

  addNewComment = (comment) => {
      this.setState((prevState) => ({
          lecture: {
              ...prevState.lecture,
              messages: [...prevState.lecture.messages, comment],
          },
      }));
  }

  render() {
    const lectureId = this.props.match.params.id;
    const { lecture, loading } = this.state;
    if (loading) return <h1 className="loading">Loading...</h1>;
    if (!lecture) return <h1>404 Not Found</h1>;
    return (
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
        <Comment.Group id="commentGroup">
          <Header as="h3" dividing>
            Comments
          </Header>
          <div className="commentCard">
            <RenderComments comments={lecture.messages || []}/>
          </div>
          <CommentForm
            lectureId={lectureId}
            onPostComment={this.onPostComment}
          />
        </Comment.Group>
      </div>
    );
  }
}
