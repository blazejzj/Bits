import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark,
    faUser,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Logo from "../Logo";
import NavLinks from "./NavLinks";
import MobileNavMenu from "./MobileNavMenu";
import { Category } from "../../types/category";

export default function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinkStyles = {
        base: "text-base font-medium transition-[background-position] duration-500 whitespace-nowrap px-3 py-1 rounded-full cursor-pointer",
        active: "bg-cyan-600 text-white hover:bg-cyan-700",
        inactive: "gradient-wipe text-black",
    };

    useEffect(() => {
        async function getCategories() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts/category`
                );
                if (!res.ok) throw new Error("Fetch error: " + res.status);
                setCategories(await res.json());
            } catch (e) {
                console.error(e);
            }
        }
        getCategories();
    }, []);

    async function handleLogout(): Promise<void> {
        try {
            await logout();
            toast.success("Successfully logged out");
            navigate("/");
        } catch {
            toast.error("Logout failed");
        }
    }

    function renderAuthButtons() {
        const btnBase =
            "flex items-center px-4 py-1 rounded-full transition cursor-pointer ";
        const active = "bg-cyan-600 text-white hover:bg-cyan-700";
        return (
            <div className="hidden lg:flex items-center space-x-3">
                {user ? (
                    <>
                        <NavLink to="/profile" className={btnBase + active}>
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Profile
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className={btnBase + active}
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                className="mr-2"
                            />
                            Log out
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className={btnBase + active}>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        Log in
                    </NavLink>
                )}
            </div>
        );
    }

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                <Logo />

                <NavLinks
                    categories={categories}
                    navLinkStyles={navLinkStyles}
                />

                {renderAuthButtons()}

                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="lg:hidden text-2xl text-cyan-700 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <FontAwesomeIcon icon={faXmark} />
                    ) : (
                        <FontAwesomeIcon icon={faBars} />
                    )}
                </button>
            </div>

            {mobileOpen && (
                <MobileNavMenu
                    categories={categories}
                    setMobileOpen={setMobileOpen}
                    handleLogout={handleLogout}
                    navLinkStyles={navLinkStyles}
                />
            )}
        </header>
    );
}
