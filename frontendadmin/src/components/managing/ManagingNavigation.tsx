import { NavLink } from "react-router";

function ManagingNavigation() {
    const navLinkStyles = {
        base: "text-base font-medium transition-[background-position] duration-500 whitespace-nowrap px-3 py-1 rounded-full cursor-pointer",
        active: "bg-gray-700 text-white hover:bg-gray-600",
        inactive: "gradient-wipe text-black",
    };

    return (
        <div className="w-full">
            <nav>
                <ul className="flex flex-row gap-6 items-center justify-center p-5 border-b-1 border-gray-300">
                    <li>
                        <NavLink
                            to={"/manage"}
                            className={({ isActive }) =>
                                [
                                    navLinkStyles.base,
                                    isActive
                                        ? navLinkStyles.active
                                        : navLinkStyles.inactive,
                                ].join(" ")
                            }
                            end
                        >
                            New Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/manage/posts"}
                            className={({ isActive }) =>
                                [
                                    navLinkStyles.base,
                                    isActive
                                        ? navLinkStyles.active
                                        : navLinkStyles.inactive,
                                ].join(" ")
                            }
                            end
                        >
                            Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/manage/categories"}
                            className={({ isActive }) =>
                                [
                                    navLinkStyles.base,
                                    isActive
                                        ? navLinkStyles.active
                                        : navLinkStyles.inactive,
                                ].join(" ")
                            }
                            end
                        >
                            Categories
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/manage/comments"}
                            className={({ isActive }) =>
                                [
                                    navLinkStyles.base,
                                    isActive
                                        ? navLinkStyles.active
                                        : navLinkStyles.inactive,
                                ].join(" ")
                            }
                            end
                        >
                            Comments
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ManagingNavigation;
