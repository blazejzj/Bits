import type { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

type ProtectedRouteProps = {
    children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
    }

    return <>{children}</>;
}
