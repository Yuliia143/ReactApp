import React, { useState } from "react";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import { getLecture, postComment } from "../../api/comments-api";

export default function CommentForm(props) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const lectionComment = async () => {
    const { lectureId, onPostComment } = props;
    setComment("");
    setLoading(true);
    const getComment = await postComment(lectureId, {
      rating: 3,
      messageText: comment,
    });
    setLoading(false);
    onPostComment(getComment);
  };

  return (
    <Form reply>
      <h3> {loading && "Sending..."}</h3>
      <Form.TextArea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <Button
        content="Add Reply"
        onClick={lectionComment}
        labelPosition="left"
        icon="edit"
        primary
      />
    </Form>
  );
}
