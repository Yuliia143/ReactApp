export interface PeerConnection {
  [key: string]: any;
}

export interface User {
  id: string;
  userName: string;
  imageUrl: string;
  socketId: string;
}

export interface Data {
  answer: object;
  socket: string;
}

export interface Candidate {
  candidate: string;
  sdpMLineIndex: number;
  sdpMin: string;
}

export interface Navigator {
  getUserMedia(
    options: { video?: boolean; audio?: boolean },
    success: (stream: object) => void,
    error?: (error: object) => void
  ): void;
}

export interface UserFromStorage {
  _id: string;
  name: string;
  email: string;
  surName: string;
  role: string;
}

export interface CommentI {
  id: string;
  commentText: string;
  author: string;
  authorId: string;
  userImage: string;
}
