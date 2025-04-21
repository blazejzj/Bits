import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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
        "text-xl font-medium gradient‑wipe transition duration-500 ease-in-out";

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
                    className="text-xl font-medium text-xl font-medium gradient‑wipe transition duration-500 ease-in-out  hover:cursor-pointer"
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
        <div className="flex flex-row w-full justify-between p-5 sticky shadow">
            <NavLink to="/">
                <h1 className="font-bold text-5xl text-cyan-700 ml-5">
                    Bits <b className="text-xs">by opex</b>
                </h1>
            </NavLink>
            <nav className="flex flex-row w-3/4 items-center">
                <ul className="flex gap-5 w-full content-center justify-center">
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
    );
}

export default Header;
