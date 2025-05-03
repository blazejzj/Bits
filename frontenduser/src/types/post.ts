import Comment from "../types/comment";
import User from "./User";
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
