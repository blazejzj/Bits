import { NavLink } from "react-router-dom";

function Logo() {
    return (
        <NavLink to="/">
            <h1 className="font-bold text-5xl text-cyan-700 ml-5 mr-3 flex items-baseline flex-nowrap text-nowrap">
                Bits <b className="text-xs">by blazejzj</b>
            </h1>
        </NavLink>
    );
}

export default Logo;
