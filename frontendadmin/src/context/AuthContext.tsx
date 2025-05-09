import { createContext } from "react";
import type AuthContextType from "../types/AuthContextType";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    setUser: () => {},
    login: async () => {},
    logout: async () => {},
});
