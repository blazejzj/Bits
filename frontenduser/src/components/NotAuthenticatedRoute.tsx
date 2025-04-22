import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

type NotProtectedRouteProps = {
    children: ReactNode;
};

function NotAuthenticatedRoute({ children }: NotProtectedRouteProps) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}

export default NotAuthenticatedRoute;
