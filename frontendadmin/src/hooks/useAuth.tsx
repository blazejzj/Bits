import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
    const useAuth = useContext(AuthContext);
    return useAuth;
}

export default useAuth;
