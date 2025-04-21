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
                console.log(data);
                setCategories(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
        }
        getCategories();
    }, []);

    async function handleLogout() {
        await logout();
        navigate("/");
    }

    function renderLoggedIn() {
        return (
            <>
                <NavLink to="/profile">Profile</NavLink>
                <button onClick={handleLogout}>Log out</button>
            </>
        );
    }

    function renderLoggedOut() {
        return (
            <>
                <NavLink to="/login">Log in</NavLink>
            </>
        );
    }

    return (
        <div>
            <h1>Bits</h1>
            <nav>
                <ul>
                    {categories.map((category) => {
                        return <li key={category.id}>{category.name}</li>;
                    })}
                </ul>
                {user ? renderLoggedIn() : renderLoggedOut()}
            </nav>
        </div>
    );
}

export default Header;
