import React from "react";
import ReactPlayer from "react-player";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import axios from "axios";
import {getLecture} from "../../services/service-comments";
import "./Lecture.css";

export default class Lecture extends React.Component {
  // commentsService = new CommentsService();
  state = {
    lecture: null,
    loading: true
  };

  updateComments = async () => {
    const {match} = this.props;
    getLecture(match.params.id)
    .then((lecture) => {
      this.setState({
        lecture,
        loading: false
      });
    })
    .catch(()=>{
      this.setState({
        loading: false
      })
    });
    console.log(this.props);
  };

  componentDidMount() {
    this.updateComments();
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
            <Comment.Actions>
              <Button type="submit">Reply</Button>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    });
  }

  render() {
    const {lecture, loading} = this.state;
    if(loading) return <h1>Loading...</h1>;
    if(!lecture) return <h1>404 Not Found</h1>;
    const commentCard = this.renderComments(lecture.messages || []);
    return (
      <div>
        <div className="video-container">
          <ReactPlayer
            className="video-item"
            url="https://www.youtube.com/watch?v=xJZa2_aldDs&t=1263s"
            controls="true"
            width="100%"
            height="450px"
          />
        </div>
        <div>
          <Statistic.Group horizontal style={{ marginLeft: "33%" }}>
            <Statistic>
              <Statistic.Value>2,345</Statistic.Value>
              <Statistic.Label>Views</Statistic.Label>
              <Statistic.Value>3,322</Statistic.Value>
              <Statistic.Label>Downloads</Statistic.Label>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Tasks</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>
        <hr />
        <Comment.Group style={{ margin: "0 auto", padding: "10px 0 40px 0" }}>
          <Header as="h3" dividing>
            Comments
          </Header>
          <div style={{ fontWeight: "bold", fontSize: "17px" }}>
            {commentCard}
          </div>
          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}
