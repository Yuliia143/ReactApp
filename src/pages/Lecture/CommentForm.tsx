import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { postComment } from "../../api/comments-api";
import { Comment } from "./modules";

export default function CommentForm(props: {
  lectureId: string;
  onPostComment: (comment: Comment) => any;
}) {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorLoading, setErrorLoading] = useState<boolean>(false);

  const lectionComment = async () => {
    if (comment.trimStart() !== "" && comment.length > 4) {
      const { lectureId, onPostComment } = props;
      setComment("");
      setLoading(true);
      setErrorLoading(false);
      const userString = localStorage.getItem('User') as string;
      const user = JSON.parse(userString);
      const {imageUrl} = user;
      let userImageUrl = '';
      if(!Object.prototype.hasOwnProperty.call(user, 'imageUrl') || imageUrl === ''){
        userImageUrl = 'https://img.icons8.com/plasticine/2x/user.png';
      }
      else{
        userImageUrl = imageUrl;
      }
      const savedComment: Comment = await postComment(lectureId, {
        rating: 3,
        messageText: comment,
        imageUrl: userImageUrl,
      });
      setLoading(false);
      onPostComment(savedComment);
    } else {
      setTimeout(() => {
        setErrorLoading(false);
      }, 4000);
      setErrorLoading(true);
    }
  };

  return (
    <Form reply>
      <h3>
        {loading && (
          <span>
            Sending <span className="first-dot">.</span>
            <span className="second-dot">.</span>
            <span className="third-dot">.</span>
          </span>
        )}
      </h3>

      <h4 className="error-comment">
        {errorLoading && "Your comment length is less than 5 characters!"}
      </h4>
      <textarea
        id="comment-textarea"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <Button
        content="Add Reply"
        onClick={lectionComment}
        labelPosition="left"
        icon="edit"
        primary
        id="btn-add-reply"
      />
    </Form>
  );
}
