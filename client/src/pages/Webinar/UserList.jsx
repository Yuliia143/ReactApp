import React, {useState, useEffect} from 'react';
import styles from './Webinar.module.css';
import {peerConnection, RTCSessionDescription, socket} from "../../App";

export default function () {
    useEffect(() => {
        socket.on("update-user-list", ({users}) => {
            createOffer(users);
            updateUserList(users);
        });

        socket.on("remove-user", ({ socketId }) => {
            const elToRemove = document.getElementById(socketId);
            if (elToRemove) {
                elToRemove.remove();
            }
        });
    });

    const createOffer = async userId => {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
        socket.emit("make-offer", {
            offer,
            to: userId
        });
    }

    const createUserItemContainer = userId => {
        const userContainerEl = document.createElement("div");

        const usernameEl = document.createElement("p");

        userContainerEl.setAttribute("class", "active-user");
        userContainerEl.setAttribute("id", userId);
        usernameEl.setAttribute("class", "username");
        usernameEl.innerHTML = `Socket: ${userId}`;

        userContainerEl.appendChild(usernameEl);
        return userContainerEl;
    }

    const updateUserList = users => {
        const activeUserContainer = document.getElementById("active-user-container");

        users.forEach(user => {
            const alreadyExistingUser = document.getElementById(user);
            if (!alreadyExistingUser) {
                const userContainerEl = createUserItemContainer(user);

                activeUserContainer.appendChild(userContainerEl);
            }
        });
    }

    return (
        <div className={styles.activeUsersPanel} id="active-user-container">
            <h3 className={styles.panelTitle}>Active Users:</h3>
        </div>
    )
}