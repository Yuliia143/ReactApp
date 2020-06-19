import React, { useState, useEffect } from "react";
import { Comment, Header } from "semantic-ui-react";
import socketIoClient from "socket.io-client";
import styles from "./Webinars.module.css";
import { RTC_CONFIG, BASE_URL } from "../../config";
import RenderComments from "../Webinar/RenderComments";
import { CommentI, Candidate } from "../Webinar/Interfaces";
import WebinarStopped from "./WebinarStopped";
import CommentForm from "./CommentForm";
import { checkUserImage } from "./checkUserImage.";
import Loader from "../Webinar/Loader";

const { RTCPeerConnection, RTCSessionDescription } = window;

interface OfferResponse {
  offer: any;
  socket: string;
}

export default function ({ match }: any) {
  const [socket] = useState(
    socketIoClient(BASE_URL || "http://localhost:3030")
  );

  const peerConnection = new RTCPeerConnection(RTC_CONFIG);

  const { params } = match;

  const [comments, setComments] = useState<CommentI[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const addNewComment = (comment: CommentI) => {
    setComments((prevComments) => {
      if (!prevComments.find((item) => item.id === comment.id)) {
        return [...prevComments, comment];
      }
      return prevComments;
    });
  };

  peerConnection.ontrack = (event: RTCTrackEvent) => {
    const remoteVideo = document.getElementById(
      "remote-video"
    ) as HTMLVideoElement;
    if (!remoteVideo) {
      return;
    }
    [remoteVideo.srcObject] = event.streams;
    remoteVideo.onloadedmetadata = () => {
      remoteVideo.play();
      setLoading(false);
    };
  };

  const leavePage = (userId: string, lectureId: string) => {
    peerConnection.close();
    socket.emit("disconnect_user", {
      userId,
      lectureId,
    });
    socket.off("candidate");
    socket.off("offer-made");
    socket.off("new_comment");
    socket.off("get_all_comments");
    socket.off("webinar_stoped");
  };

  useEffect(() => {
    const userStr = localStorage.getItem("User") as string;
    const { _id, name, surName, imageUrl } = JSON.parse(userStr);

    socket.emit("new_user_joined", {
      lectureId: params.id,
      userId: _id,
      userName: `${name} ${surName}`,
      imageUrl: checkUserImage(imageUrl),
    });

    socket.on("candidate", (id: string, candidate: Candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => {
          throw new Error(e);
        });
    });

    socket.on("offer-made", async (data: OfferResponse) => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(
        new RTCSessionDescription(answer)
      );

      socket.emit("make-answer", {
        answer,
        to: data.socket,
      });

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", data.socket, event.candidate);
        }
      };
    });

    socket.on("new_comment", (comment: CommentI) => {
      const localComment = comment;
      if (localComment.authorId === _id) {
        localComment.author = "Me";
      }
      addNewComment(localComment);
    });

    socket.on("get_all_comments", (allComments: CommentI[]) => {
      allComments.filter((item) => {
        const el = item;
        if (el.authorId === _id) {
          el.author = "Me";
        }
        return el;
      });
      setComments(allComments);
    });

    socket.on("webinar_stoped", () => {
      setOpenModal(true);
    });

    window.addEventListener("beforeunload", () => leavePage(_id, params.id));

    return () => {
      window.removeEventListener("beforeunload", () =>
        leavePage(_id, params.id)
      );

      leavePage(_id, params.id);
      socket.close();
    };
  }, []);

  return openModal === true ? (
    <WebinarStopped />
  ) : (
    <div id="video" className={styles.videoContainer}>
      {loading === true ? <Loader /> : null}
      <video autoPlay id="remote-video" className={styles.remoteVideo} />
      <Comment.Group className={styles.commentsGroup}>
        <Header as="h3" dividing className={styles.commentTitle}>
          Comments
        </Header>
        <div id={styles.commentCard}>
          <RenderComments comments={comments} />
        </div>
        <CommentForm
          creator={params.id}
          onPostComment={addNewComment}
          socket={socket}
        />
      </Comment.Group>
    </div>
  );
}
