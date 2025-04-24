import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Logo from "./Logo";

interface Category {
    id: number;
    name: string;
}

function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await fetch(
                    "http://localhost:3000/posts/category",
                    {
                        method: "GET",
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed fetching data." + response.status);
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }
        getCategories();
    }, []);

    async function handleLogout() {
        try {
            await logout();
            toast.success("Successfully logged out!");
            navigate("/");
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Something went wrong...");
            }
        }
    }

    const linkBaseClasses =
        "text-m font-medium gradient-wipe transition-[background-position,transform] duration-500 ease-in-out border-b-2 whitespace-nowrap";

    function renderLoggedIn() {
        return (
            <>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `${linkBaseClasses} ${
                            isActive ? "border-cyan-700" : "border-transparent"
                        }`
                    }
                >
                    Profile
                </NavLink>
                <button
                    onClick={handleLogout}
                    className={`${linkBaseClasses} border-transparent hover:cursor-pointer`}
                >
                    Log out
                </button>
            </>
        );
    }

    function renderLoggedOut() {
        return (
            <NavLink
                to="/login"
                className={({ isActive }) =>
                    `${linkBaseClasses} ${
                        isActive ? "border-cyan-700" : "border-transparent"
                    }`
                }
            >
                Log in
            </NavLink>
        );
    }

    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 z-10 mb-3">
            <div className="flex justify-between p-5">
                <Logo />

                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? (
                        <FontAwesomeIcon
                            icon={faXmark}
                            size="2xl"
                            className="text-cyan-700"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faBars}
                            size="2xl"
                            className="text-cyan-700"
                        />
                    )}
                </button>

                <nav className="hidden md:flex flex-row w-3/4 items-end">
                    <ul className="flex gap-5 w-full content-center justify-center ml-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${linkBaseClasses} ${
                                    isActive
                                        ? "border-cyan-700"
                                        : "border-transparent"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        {categories.map((category) => (
                            <NavLink
                                key={category.id}
                                to={`/posts?category=${category.id}`}
                                className={({ isActive }) =>
                                    `${linkBaseClasses} ${
                                        isActive
                                            ? "border-cyan-700"
                                            : "border-transparent"
                                    }`
                                }
                            >
                                {category.name}
                            </NavLink>
                        ))}

                        {user ? renderLoggedIn() : renderLoggedOut()}
                    </ul>
                </nav>
            </div>
            {mobileOpen && (
                <nav className="md:hidden bg-white border-t border-gray-200">
                    <ul className="flex flex-col p-4 space-y-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${linkBaseClasses} ${
                                    isActive
                                        ? "border-cyan-700"
                                        : "border-transparent"
                                }`
                            }
                            onClick={() => setMobileOpen(false)}
                        >
                            Home
                        </NavLink>

                        {categories.map((category) => (
                            <NavLink
                                key={category.id}
                                to={`/posts?category=${category.id}`}
                                className={({ isActive }) =>
                                    `${linkBaseClasses} ${
                                        isActive
                                            ? "border-cyan-700"
                                            : "border-transparent"
                                    }`
                                }
                                onClick={() => setMobileOpen(false)}
                            >
                                {category.name}
                            </NavLink>
                        ))}

                        {user ? renderLoggedIn() : renderLoggedOut()}
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
