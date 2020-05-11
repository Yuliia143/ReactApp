import {socket} from "../../App";

const createUserItemContainer = (userId: string) => {
    const userContainerEl = document.createElement("div");

    const usernameEl = document.createElement("p");

    userContainerEl.setAttribute("class", "active-user");
    userContainerEl.setAttribute("id", userId);
    usernameEl.setAttribute("class", "username");
    usernameEl.innerHTML = `Socket: ${userId}`;

    userContainerEl.append(usernameEl);
    return userContainerEl;
}

export const updateUserList = (user: string) => {
    const activeUserContainer = document.getElementById("active-user-container") as HTMLElement;
    const alreadyExistingUser = document.getElementById(user) as HTMLElement;
    const userContainerEl = createUserItemContainer(user);

    activeUserContainer.append(userContainerEl);
}

export const peerUpdating = (peerConnection: any, userId: string) => {
    peerConnection.onicecandidate = (event:any) => {
        if (event.candidate) {
            socket.emit("candidate", userId, event.candidate);
        }
    };

    peerConnection
        .createOffer()
        .then((sdp: string) => peerConnection.setLocalDescription(sdp))
        .then(() => {
            socket.emit("make-offer", {
                offer: peerConnection.localDescription,
                to: userId
            });
        });
}