import Response from "../types/response";
import User from "./User";

export default interface Comment {
    id: string;
    text: string;
    published_at: string;
    updated_at: string;
    userId: string;
    responses: Response[];
    user: User;
}
