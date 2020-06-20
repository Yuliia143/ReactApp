import React from "react";
import { Comment } from "semantic-ui-react";
import { Comment as CommentI } from "./modules";

export const RenderComments = (props: { comments: CommentI[] }) => {
  const { comments } = props;
  return (
    <div>
      {comments.map((item) => {
        const time = item.createdOn.slice(11, 16);
        const date = item.createdOn.slice(0, 10);
        return (
          <Comment key={item._id} id="comment-container">
            <Comment.Avatar src={item.imageUrl} />
            <Comment.Author id="author">{item.author}</Comment.Author>
            <Comment.Content>
              <Comment.Metadata>
                <div className="date">
                  {date} / {time}
                </div>
              </Comment.Metadata>
              <Comment.Text>{item.messageText}</Comment.Text>
            </Comment.Content>
          </Comment>
        );
      })}
    </div>
  );
};
