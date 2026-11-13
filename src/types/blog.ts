export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  published: string;
  updated: string;
  url: string;
  thumbnail?: string;
  author: { name: string };
  categories: string[];
}

export interface BlogFeedResult {
  title?: string;
  subtitle?: string;
  updated?: string;
  posts: BlogPost[];
}
