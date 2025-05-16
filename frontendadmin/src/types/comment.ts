import type { User } from "./user";

export interface Comment {
    id: string;
    text: string;
    published_at: string;
    updated_at: string;
    userId: string;
    responses: Response[];
    user: User;
}
