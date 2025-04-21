import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

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
        await logout();
        navigate("/");
    }

    const linkBaseClasses =
        "text-m font-medium gradient-wipe transition duration-500 ease-in-out border-b-2 text-nowrap";

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
                    className="text-m font-medium text-m gradient‑wipe transition duration-500 ease-in-out hover:cursor-pointer border-b-2 text-nowrap"
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
                <NavLink to="/">
                    <h1 className="font-bold text-5xl text-cyan-700 ml-5 mr-3 flex items-baseline flex-nowrap text-nowrap">
                        Bits <b className="text-xs">by opex</b>
                    </h1>
                </NavLink>

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
