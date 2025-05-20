import type { User } from "./user";

export default interface Response {
    id: string;
    text: string;
    published_at: string;
    updated_at: string;
    userId: string;
    user: User;
}
