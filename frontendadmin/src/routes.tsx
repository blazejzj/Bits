import App from "./App";
import Dashboard from "./components/Dashboard";
import ManagingPanel from "./components/ManagingPanel";
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
        ],
    },
];

export default routes;
