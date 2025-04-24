import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import { MobileNavMenuProps } from "../../types/nav";

function MobileNavMenu({
    categories,
    setMobileOpen,
    handleLogout,
    navLinkStyles,
}: MobileNavMenuProps) {
    const { user } = useAuth();

    return (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
            <ul className="flex flex-col px-4 py-5 space-y-3">
                <NavLink
                    to="/"
                    onClick={() => setMobileOpen(false)}
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

                {categories.map((cat) => (
                    <NavLink
                        key={cat.id}
                        to={`/posts?category=${cat.id}`}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                            [
                                navLinkStyles.base,
                                isActive
                                    ? navLinkStyles.active
                                    : navLinkStyles.inactive,
                            ].join(" ")
                        }
                    >
                        {cat.name}
                    </NavLink>
                ))}

                <div className="pt-4 border-t border-gray-100 space-y-2">
                    {user ? (
                        <>
                            <NavLink
                                to="/profile"
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition cursor-pointer`}
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="mr-2"
                                />
                                Profile
                            </NavLink>
                            <button
                                onClick={async () => {
                                    await handleLogout();
                                    setMobileOpen(false);
                                }}
                                className={`flex items-center px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition cursor-pointer`}
                            >
                                <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                    className="mr-2"
                                />
                                Log out
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition cursor-pointer`}
                        >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Log in
                        </NavLink>
                    )}
                </div>
            </ul>
        </div>
    );
}

export default MobileNavMenu;
