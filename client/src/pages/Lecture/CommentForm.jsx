import React, { Component } from "react";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import {getLecture, postComment } from "../../api/comments-api";

export default class CommentForm extends Component {

  state = {
    comment: "",
    loading: false,
  };

  postComment = async () => {
    const { lectureId} = this.props;
    await postComment(lectureId, {
      rating: 3,
      messageText: this.state.comment,
    });
    this.setState({loading: false});
  };

  handleSubmit = () => this.setState({comment: "", loading: true});

  render() {
    const { comment, loading } = this.state;
    return (
      <Form reply onSubmit={this.handleSubmit}>
         <h3> {loading && "Sending..."}</h3>
        <Form.TextArea
          value={comment}
          onChange={(event) => {
            console.log(event);
            this.setState({ comment: event.target.value});
          }}
        />
     
        <Button
          content="Add Reply"
          onClick={this.postComment}
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    );
  }
}
