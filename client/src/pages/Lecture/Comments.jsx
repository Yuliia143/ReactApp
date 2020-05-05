import React from "react";
import {Button, Comment, Form, Header, Statistic} from "semantic-ui-react";
import CommentForm from "./CommentForm";
import {RenderComments} from "./RenderComments";
import "./Lecture.css";
import {BASE_URL} from "../../config";
import {socket} from '../../App';

export default class Comments extends React.Component {
    state = {
        messages: []
    };

    leave_room = () => {
        socket.emit('Leave room', this.props.lectureId);
    }

    componentDidMount() {
        this.setState({messages: this.props.messages});
        window.addEventListener('beforeunload', this.leave_room);
        socket.emit('join_room', this.props.lectureId);
        socket.on('send_message', this.addNewComment);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.leave_room);
    }

    addNewComment = comment => {
        this.setState((prevState) => {
            const prevMessages = prevState.messages;
            if (!prevMessages.find(item => item._id === comment._id)) {
                return {messages: [...prevState.messages, comment]};
            }
            return {};
        });
    }

    render() {
        const {messages} = this.state;
        const {lectureId} = this.props;

        return (
            <Comment.Group id="commentGroup">
                <Header as="h3" dividing>
                    Comments
                </Header>
                <div className="commentCard">
                    <RenderComments comments={messages || []}/>
                </div>
                <CommentForm
                    lectureId={lectureId}
                    onPostComment={this.addNewComment}
                />
            </Comment.Group>
        );
    }
}
