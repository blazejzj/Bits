import type { User } from "./user";
import type { Comment } from "./comment";

export interface Post {
    id: number;
    title: string;
    text: string;
    categoryId: number;
    published_at: string;
    updated_at: string;
    published: boolean;
    comments: Comment[];
    user: User;
}
