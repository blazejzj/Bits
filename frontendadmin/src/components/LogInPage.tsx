import { useState } from "react";
import LogInForm from "./LogInForm";
import useAuth from "../hooks/useAuth";

function LogInPage() {
    const [error, setError] = useState<string>("");
    const { login } = useAuth();

    function clearError() {
        setError("");
    }

    function addNewError(err: string) {
        setError(err);
    }

    function handleLogIn(username: string, password: string) {
        login(username, password);
    }

    return (
        <div>
            <h1>Welcome! Please log in.</h1>
            {error && <p>error</p>}
            <LogInForm handleLogIn={handleLogIn} clearError={clearError} />
        </div>
    );
}

export default LogInPage;
