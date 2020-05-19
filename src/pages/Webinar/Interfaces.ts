export interface PeerConnection{[key: string]: any};

export interface User{
    id: string
}

export interface Data {
    answer: object,
    socket: string
}

export interface Candidate {
    candidate: string,
    sdpMLineIndex: number,
    sdpMin: string
}

export interface Navigator {
    getUserMedia(
        options: { video?: boolean; audio?: boolean; },
        success: (stream: object) => void,
        error?: (error: object) => void
    ) : void;
}