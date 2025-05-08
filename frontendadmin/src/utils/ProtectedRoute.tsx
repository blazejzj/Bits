import type { ReactNode } from "react";

type ProtectedRouteProps = {
    children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    // check here if user is logged in, if yes, go to children, else navigate to login (root)

    return <>{children}</>;
}
