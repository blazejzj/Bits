import { useState } from "react";
import LogInForm from "./LogInForm";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../../utils/ErrorMessage";

function LogInPage() {
    const [error, setError] = useState<string>("");
    const { login } = useAuth();

    function clearError() {
        setError("");
    }

    function addNewError(err: string) {
        setError(err);
    }

    async function handleLogIn(username: string, password: string) {
        try {
            await login(username, password);
        } catch (err) {
            if (err instanceof Error) {
                addNewError("Wrong username or password");
            }
        }
    }

    return (
        <div>
            <div className="flex-1 flex items-center justify-center py-12">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-700 text-center">
                        Log in
                    </h1>
                    {error && <ErrorMessage errorMsg={error} />}
                    <LogInForm
                        handleLogIn={handleLogIn}
                        clearError={clearError}
                    />
                </div>
            </div>
        </div>
    );
}

export default LogInPage;
