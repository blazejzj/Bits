import "../index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./components/routes.tsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
);
