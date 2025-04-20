import HomePage from "./HomePage";
import LogIn from "./LogIn";
import RegisterUser from "./RegisterUser";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";
import App from "../App";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/profile", element: <Profile /> },
            { path: "/login", element: <LogIn /> },
            { path: "/register", element: <RegisterUser /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
];

export default routes;
