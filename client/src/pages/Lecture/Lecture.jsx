import React from "react";
import ReactPlayer from "react-player";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import axios from "axios";
import { getLecture, postComment } from "../../services/service-comments";
import CommentForm from "./CommentForm";
import "./Lecture.css";

export default class Lecture extends React.Component {
  state = {
    lecture: null,
    loading: true,
  };

  fetchLecture = async () => {
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

  renderComments(result) {
    return result.map((item) => {
      console.log(item);
      const date = item.createdOn.slice(11, 16);
      return (
        <Comment key={item.id}>
          <Comment.Avatar />
          <Comment.Content>
            <Comment.Author></Comment.Author>
            <Comment.Metadata>
              <div>{date}</div>
            </Comment.Metadata>
            <Comment.Text> {item.messageText}</Comment.Text>
          </Comment.Content>
        </Comment>
      );
    });
  }

  render() {
    const lectureId = this.props.match.params.id;
    const { lecture, loading } = this.state;
    if (loading) return <h1>Loading...</h1>;
    if (!lecture) return <h1>404 Not Found</h1>;
    const commentCard = this.renderComments(lecture.messages || []);
    return (
      <div>
        <h1>{lecture.title}</h1>
        <div className="video-container">
          <ReactPlayer
            className="video-item"
            url={lecture.videoUrl}
            controls="true"
            width="100%"
            height="450px"
          />
        </div>
        <div>{lecture.description}</div>
        <hr />
        <Comment.Group style={{ margin: "0 auto", padding: "10px 0 40px 0" }}>
          <Header as="h3" dividing>
            Comments
          </Header>
          <div style={{ fontWeight: "bold", fontSize: "17px" }}>
            {commentCard}
          </div>
         <CommentForm lectureId={lectureId}/>
        </Comment.Group>
      </div>
    );
  }
}
