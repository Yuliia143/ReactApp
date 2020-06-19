import React, {useEffect, useState} from "react";
import socketIoClient from "socket.io-client";
import styles from "./Webinar.module.css";
import StartWebinar from "./StartWebinar";
import { BASE_URL } from "../../config";

export default function () {
    const [socket] = useState(socketIoClient(BASE_URL || "http://localhost:3030"));
    useEffect(() => {
        return () => {
            socket.close();
        }
    }, [])

  return (
    <div className={styles.container}>
      <StartWebinar socket={socket} />
    </div>
  );
}
