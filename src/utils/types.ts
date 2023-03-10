export interface StoredSong {
  commentCount: number;
  displayName: string | null;
  genre: string;
  modifiedName: string;
  originalName: string;
  uid: string;
  url: string;
  docId: string;
}

export interface User {
  age: number | string;
  country: string;
  email: string;
  name: string;
}

export interface Comment {
  comment: string;
  userId: string;
  songId: string;
  docId: string;
  displayName: string;
  dateAdded: string;
}
