import type { SetStateAction } from "react";
import type { User } from "./user";

export default interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: React.Dispatch<SetStateAction<User | null>>;
    login: (login: string, password: string) => void;
    logout: () => void;
}
