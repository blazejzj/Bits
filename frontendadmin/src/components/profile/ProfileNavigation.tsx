import { NavLink } from "react-router";

function ProfileNavigation() {
    const btnBase =
        "flex items-center px-4 py-1 rounded-full transition cursor-pointer ";
    const active = "bg-gray-700 text-white hover:bg-gray-600";
    const navLinkStyles = {
        base: "text-base font-medium transition-[background-position] duration-500 whitespace-nowrap px-3 py-1 rounded-full cursor-pointer",
        active: "bg-gray-700 text-white hover:bg-gray-600",
        inactive: "gradient-wipe text-black",
    };

    return (
        <nav className=" p-4 border-r-1 border-gray-200">
            <ul className="w-full flex flex-col gap-3">
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            [
                                navLinkStyles.base,
                                isActive
                                    ? navLinkStyles.active
                                    : navLinkStyles.inactive,
                            ].join(" ")
                        }
                        end
                        to={"/profile"}
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            [
                                navLinkStyles.base,
                                isActive
                                    ? navLinkStyles.active
                                    : navLinkStyles.inactive,
                            ].join(" ")
                        }
                        end
                        to={"/profile/password"}
                    >
                        Password
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            [
                                navLinkStyles.base,
                                isActive
                                    ? navLinkStyles.active
                                    : navLinkStyles.inactive,
                            ].join(" ")
                        }
                        end
                        to={"/profile/delete"}
                    >
                        Delete Account
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default ProfileNavigation;
