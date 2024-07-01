export interface Post {
  id?: number;
  title: string;
  desc: string;
  userId?: number;
}

export interface User {
  id?: number;
  title: string;
  desc: string;
  posts?: Post[];
}

