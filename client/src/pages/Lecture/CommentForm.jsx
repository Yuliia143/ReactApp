import React, { Component } from "react";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import { postComment } from "../../services/service-comments";
export default class CommentForm extends Component {
  state = {
    comment: "",
    loading: false,
  };
  postComment = async () => {
    const { lectureId } = this.props;
    await postComment(lectureId, {
      rating: 3,
      messageText: this.state.comment,
    });
    //todo: push element into comments array
  };
  render() {
    const { comment, loading } = this.state;
    return (
      <Form reply>
        <Form.TextArea
          value={comment}
          onChange={(event) => {
            console.log(event);
            this.setState({ comment: event.target.value });
          }}
        />
        {loading && "Sending..."}
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
