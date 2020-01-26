import { Post } from './post';

export interface Comment extends Post {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
