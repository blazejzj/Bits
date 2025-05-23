import type { User } from "./user";
import type Response from "./response";

export interface Comment {
    id: string;
    text: string;
    postId: number;
    published_at: string;
    updated_at: string;
    userId: string;
    responses: Response[];
    user: User;
}
