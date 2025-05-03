import User from "./User";

export default interface Response {
    id: string;
    text: string;
    published_at: string;
    updated_at: string;
    userId: string;
    user: User;
}
