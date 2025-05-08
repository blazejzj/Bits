import App from "./App";
import Dashboard from "./components/Dashboard";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
        ],
    },
];

export default routes;
