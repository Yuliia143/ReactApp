export const peerUpdating = (
    peerConnection: RTCPeerConnection,
    userId: string,
    socket: any
) => {
    const newPeerConnection = peerConnection;

    newPeerConnection.onicecandidate = (event: any) => {
        if (event.candidate) {
            socket.emit('candidate', userId, event.candidate);
        }
    };

    newPeerConnection
        .createOffer()
        .then((sdp: RTCSessionDescriptionInit) => {
            peerConnection.setLocalDescription(sdp);
        })
        .then(() => {
            socket.emit('make-offer', {
                offer: peerConnection.localDescription,
                to: userId
            });
        });
};
