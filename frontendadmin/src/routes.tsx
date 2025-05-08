import App from "./App";
import Dashboard from "./components/Dashboard";
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
        ],
    },
];

export default routes;
