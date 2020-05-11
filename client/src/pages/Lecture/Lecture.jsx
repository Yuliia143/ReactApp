import React from "react";
import ReactPlayer from "react-player";
import { getLecture} from "../../api/comments-api";
import "./Lecture.css";
import Comments from "./Comments";

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


  render() {
    const lectureId = this.props.match.params.id;
    const { lecture, loading } = this.state;
    if (loading) return <h1 className="loading">Loading...</h1>;
    if (!lecture) return <h1>404 Not Found</h1>;
    return (
      <div>
        <h1 className="comment-title">{lecture.title}</h1>
        <div className="video-container">
          <ReactPlayer
            className="video-item"
            url={lecture.videoUrl}
            controls="true"
            width="100%"
            height="450px"
          />
        </div>
        <div className="comment-description">
          This video is about: {lecture.description}

        </div>
        <Comments messages={lecture.messages} lectureId={lectureId}/>
      </div>
    );
  }
}
