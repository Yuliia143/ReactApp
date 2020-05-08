import React from "react";
import ReactPlayer from "react-player";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import axios from "axios";
import { getLecture, postComment } from "../../api/comments-api";
import CommentForm from "./CommentForm";
import { RenderComments } from "./RenderComments";
import "./Lecture.css";

export default class Lecture extends React.Component {
  state = {
    lecture: null,
    loading: true,
  };

  fetchLecture = async () => {
    console.log(this.props);
    const { match } = this.props;
    getLecture(match.params.id)
      .then((lecture) => {
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
  }
  onPostComment = (comment) =>
    this.setState((prevState) => ({
      lecture: {
        ...prevState.lecture,
        messages: [...prevState.lecture.messages, comment],
      },
    }));

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
