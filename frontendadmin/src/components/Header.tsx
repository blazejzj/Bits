import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    const btnBase =
        "flex items-center px-4 py-1 rounded-full transition cursor-pointer ";
    const active = "bg-gray-700 text-white hover:bg-gray-600";
    const navLinkStyles = {
        base: "text-base font-medium transition-[background-position] duration-500 whitespace-nowrap px-3 py-1 rounded-full cursor-pointer",
        active: "bg-gray-700 text-white hover:bg-gray-600",
        inactive: "gradient-wipe text-black",
    };
    function renderMenu() {
        return (
            <nav className="">
                <ul className="flex gap-16 items-center">
                    <li>
                        <NavLink
                            to={`/`}
                            className={({ isActive }) =>
                                [
                                    navLinkStyles.base,
                                    isActive
                                        ? navLinkStyles.active
                                        : navLinkStyles.inactive,
                                ].join(" ")
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to={`/manage`}
                            className={({ isActive }) =>
                                [
                                    navLinkStyles.base,
                                    isActive
                                        ? navLinkStyles.active
                                        : navLinkStyles.inactive,
                                ].join(" ")
                            }
                        >
                            Panel
                        </NavLink>
                    </li>
                    <div className="flex gap-4">
                        <NavLink
                            to="/profile"
                            className={btnBase + active}
                            data-testid="profile-button"
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Profile
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className={btnBase + active}
                            data-testid="logout-button"
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                className="mr-2"
                            />
                            Log out
                        </button>
                    </div>
                </ul>
            </nav>
        );
    }
    return (
        <header className="flex justify-between items-center p-6 sticky top-0 bg-white shadow-sm">
            <Logo />
            {renderMenu()}
        </header>
    );
}

export default Header;
