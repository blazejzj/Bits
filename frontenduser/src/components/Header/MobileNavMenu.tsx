import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import { MobileNavMenuProps } from "../../types/nav";
import { slugify } from "../../utils/slugify";

function MobileNavMenu({
    categories,
    setMobileOpen,
    handleLogout,
    navLinkStyles,
}: MobileNavMenuProps) {
    const { user } = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get("category");

    const isBrowseActive = location.pathname === "/posts" && !currentCategory;

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
                <NavLink
                    to="/posts"
                    onClick={() => setMobileOpen(false)}
                    className={[
                        navLinkStyles.base,
                        isBrowseActive
                            ? navLinkStyles.active
                            : navLinkStyles.inactive,
                    ].join(" ")}
                >
                    Browse
                </NavLink>
                {categories.map((cat) => {
                    const slug = slugify(cat.name);
                    const isActive =
                        location.pathname === "/posts" &&
                        currentCategory === slug;

                    return (
                        <NavLink
                            key={cat.id}
                            to={`/posts?category=${slug}`}
                            onClick={() => setMobileOpen(false)}
                            className={[
                                navLinkStyles.base,
                                isActive
                                    ? navLinkStyles.active
                                    : navLinkStyles.inactive,
                            ].join(" ")}
                        >
                            {cat.name}
                        </NavLink>
                    );
                })}
                <div className="pt-4 border-t border-gray-100 space-y-2 flex items-center justify-between flex-wrap">
                    {user ? (
                        <>
                            <NavLink
                                to="/profile"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition cursor-pointer mt-2"
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
                                className="flex items-center px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition cursor-pointer"
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
                            className="flex items-center px-3 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition cursor-pointer"
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
