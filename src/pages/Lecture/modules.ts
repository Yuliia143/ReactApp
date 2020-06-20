export interface Lection {
  id: string;
  videoUrl: string;
  description: string;
  title: string;
  messages: Comment[];
}

export interface Comment {
  _id: string;
  messageText: string;
  author: string;
  rating: number;
  createdOn: string;
  imageUrl: string;
}
