import HomePage from "./HomePage";
import LogIn from "./LogIn";
import RegisterUser from "./RegisterUser";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";
import App from "../App";
import AuthenticatedRoute from "./AuthenticatedRoute";
import NotAuthenticatedRoute from "./NotAuthenticatedRoute";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "/profile",
                element: (
                    <AuthenticatedRoute>
                        <Profile />
                    </AuthenticatedRoute>
                ),
            },
            {
                path: "/login",
                element: (
                    <NotAuthenticatedRoute>
                        <LogIn />
                    </NotAuthenticatedRoute>
                ),
            },
            {
                path: "/register",
                element: (
                    <NotAuthenticatedRoute>
                        <RegisterUser />
                    </NotAuthenticatedRoute>
                ),
            },
            { path: "*", element: <ErrorPage /> },
        ],
    },
];

export default routes;
