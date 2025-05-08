import { Link } from "react-router";

function Logo() {
    return (
        <Link to={"/"} className="flex text-gray-700 font-bold">
            <span className="text-5xl">Bits</span>
            <p className="flex flex-col self-end text-sm">
                by blazejzj <span className="ml-4 mt-4.5 fixed">- ADMIN</span>
            </p>
        </Link>
    );
}

export default Logo;
