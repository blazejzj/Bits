import { NavLink } from "react-router-dom";
function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-5">
            <h1 className="font-bold text-cyan-700 text-6xl">
                Oops! Looks like you're lost!
            </h1>
            <p className="text-2xl">Page you are looking for doesn't exist!</p>
            <p className="text-xl">
                Click here to{" "}
                <NavLink
                    to="/"
                    className="font-bold text-cyan-700 gradient-wipe transition-[background-position,transform] duration-500 ease-in-out"
                >
                    get home
                </NavLink>
            </p>
        </div>
    );
}

export default ErrorPage;
