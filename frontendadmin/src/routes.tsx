import App from "./App";
import Dashboard from "./components/Dashboard";
import ManagingPanel from "./components/ManagingPanel";
import Profile from "./components/profile/Profile";
import ProfileDelete from "./components/profile/ProfileDelete";
import ProfileInformation from "./components/profile/ProfileInformation";
import ProfilePassword from "./components/profile/ProfilePassword";
import ProtectedRoute from "./utils/ProtectedRoute";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <Dashboard />,
                    </ProtectedRoute>
                ),
            },
            {
                path: "/manage",
                element: (
                    <ProtectedRoute>
                        <ManagingPanel />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <ProfileInformation />,
                    },
                    {
                        path: "/profile/password",
                        element: <ProfilePassword />,
                    },
                    {
                        path: "/profile/delete",
                        element: <ProfileDelete />,
                    },
                ],
            },
        ],
    },
];

export default routes;
