import { NavLink } from "react-router-dom";
function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-cyan-700 text-4xl">
                Oops! Looks like you're lost!
            </h1>
            <p>Page you are looking for doesn't exist!</p>
            <p>
                Click here to <NavLink to="/">get home</NavLink>
            </p>
        </div>
    );
}

export default ErrorPage;
