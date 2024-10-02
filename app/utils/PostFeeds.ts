export interface PostFeedsRequest {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

export interface User {
  image?: string | null;
  name: string;
  username: string;
}

export interface ForumComment {
  id: string;
  created_at: Date;
  creator_id: string;
  forum_id: string;
  content: string;
  coin: bigint;
  user: User | null;
}

export interface ForumResponse {
  id: string;
  created_at: Date;
  creator_id: string;
  image: string | null;
  title: string;
  description: string;
  coin: bigint;
  tag: string[];
  user: User | null;
  ForumComment: ForumComment[];
}

export interface Comment {
  author: string;
  authorAvatar?: string;
  username: string;
  content: string;
}

export interface FormattedForum {
  id: string;
  date: string;
  avatarSrc: string;
  authorName: string;
  username: string;
  title: string;
  content: string;
  tags: string[];
  comments: Comment[];
}
