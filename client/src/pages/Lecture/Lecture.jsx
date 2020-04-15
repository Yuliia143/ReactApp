import React from "react";
import ReactPlayer from "react-player";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import axios from "axios";
import "./Lecture.css";

export default class Lecture extends React.Component {
  state = {
    message: [],
  };

  loadLectures() {
    return axios
      .get(
        "https://glacial-chamber-22605.herokuapp.com/api/lectures/5e935cc29f474d31420b243a",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk0OWY3MTVmZjFjYzAwMTdjZWQzZGEiLCJlbWFpbCI6InNvbWVvbmUyQGdtYWlsLmNvbSIsIm5hbWUiOiJTb21lb25lMiIsImlzQWRtaW4iOmZhbHNlLCJleHAiOjE1ODc1NDQ5OTMsImlhdCI6MTU4Njk0MDE5M30.ZcVcDcXXCLDazSTDCIzbLGTc4yn2mMfmGdNl-kSv6T4",
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        const messages = result.data.messages.map((item) => {
          const data = item.createdOn.slice(11, 16);
          return (
            <Comment>
              <Comment.Avatar/>
              <Comment.Content>
                <Comment.Author as="a"></Comment.Author>
                <Comment.Metadata>
                  <div>{data}</div>
                </Comment.Metadata>
                <Comment.Text> {item.messageText}</Comment.Text>
                <Comment.Actions>
                  <Button type="submit">Reply</Button>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        });
        // console.log(messages);
        this.setState({ messages });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.loadLectures();
  }

  render() {
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
            {this.state.messages}
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
