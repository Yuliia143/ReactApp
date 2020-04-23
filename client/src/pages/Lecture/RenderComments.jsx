import React from 'react';
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";

 export const RenderComments = ({comments}) => {
    return comments.map((item) => {
      const time = item.createdOn.slice(11, 16);
      const date = item.createdOn.slice(0, 10);
      return (
        <Comment key={item.id} id="comment-container">
          <Comment.Avatar src="https://img.icons8.com/plasticine/2x/user.png" />
          <Comment.Author id="author"> {item.author}</Comment.Author>
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
    });
  };
  