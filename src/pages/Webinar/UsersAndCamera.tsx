import React, { useEffect, useState } from "react";
import { Button, Confirm, List } from "semantic-ui-react";
import styles from "./Webinar.module.css";
import { RTC_CONFIG } from "../../config";
import { peerUpdating } from "./updateUserList";
import { PeerConnection, User as UserI, Data, Candidate } from "./Interfaces";
import User from "./User";
import { leavePage, stopWebinar } from "./stopWebinat";
import Loader from "./Loader";

const peerConnections: PeerConnection = {};

export default function ({ socket }: any) {
  const [users, setUsers] = useState<UserI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [webinarStatus, setWebinarStatus] = useState<boolean>(false);

  const addNewUser = (user: UserI) => {
    setUsers((prevUsers) => {
      if (!prevUsers.find((item) => item.id === user.id)) {
        return [...prevUsers, user];
      }
      return prevUsers;
    });
  };

  const removeUser = (user: UserI) => {
    setUsers((prevUsers) => {
      return prevUsers.filter((item) => item.id !== user.id);
    });
  };

  useEffect(() => {
    navigator.getUserMedia(
      { video: true, audio: true },
      (stream) => {
        const localVideo = document.getElementById(
          "local-video"
        ) as HTMLVideoElement;
        if (localVideo) {
          localVideo.srcObject = stream;
          setLoading(false);
        }
      },
      (error: any) => {
        throw new Error(error.message);
      }
    );

    socket.on("update-user-list", (user: UserI) => {
      const peerConnection = new RTCPeerConnection(RTC_CONFIG);
      peerConnections[user.socketId] = peerConnection;

      const videoElement = document.getElementById(
        "local-video"
      ) as HTMLVideoElement;
      const stream = videoElement.srcObject as MediaStream;
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerUpdating(peerConnection, user.socketId, socket);

      addNewUser(user);
    });
    
    socket.on("remove-user", (user: UserI) => {
      removeUser(user);
      if (peerConnections[user.id] !== undefined) {
        peerConnections[user.id].close();
        delete peerConnections[user.id];
      }
    });

    socket.on("answer-made", async (data: Data) => {
      peerConnections[data.socket].setRemoteDescription(data.answer);
    });

    window.addEventListener("beforeunload", () => leavePage(socket));
    return () => {
      window.removeEventListener("beforeunload", () => leavePage(socket));
      leavePage(socket);
    };
  }, []);

  const showConfirm = (): void => {
    setWebinarStatus(true);
  };

  const handleConfirm = () => {
    stopWebinar(socket);
    setWebinarStatus(false);
    socket.close();
  };

  return (
    <div id="mainContainer">
      {webinarStatus === true ? (
        <Confirm
          open
          onCancel={() => setWebinarStatus(false)}
          onConfirm={handleConfirm}
        />
      ) : null}
      {loading === true ? <Loader /> : null}
      <div className={styles.activeUsersPanel} id="active-user-container">
        <h3 className={styles.panelTitle}>Active Users:</h3>
        <List>
          {users.map((item) => (
            <User key={item.id} user={item} />
          ))}
        </List>
      </div>
      <div className={styles.cameraAndButton}>
        <video autoPlay muted className={styles.webCamera} id="local-video" />
        <Button
          className="negative ui button"
          id={styles.btn}
          onClick={showConfirm}
        >
          Stop webinar now
        </Button>
      </div>
    </div>
  );
}
