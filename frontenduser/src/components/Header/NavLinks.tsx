import { NavLink } from "react-router-dom";
import { NavLinksProps } from "../../types/nav";

function NavLinks({ categories, navLinkStyles }: NavLinksProps) {
    return (
        <nav className="hidden lg:flex flex-1 justify-center space-x-4">
            {["Home", ...categories.map((c) => c.name)].map((label, i) => {
                const to =
                    label === "Home"
                        ? "/"
                        : `/posts?category=${categories[i - 1]?.id}`;
                return (
                    <NavLink
                        key={label}
                        to={to}
                        end={label === "Home"}
                        className={({ isActive }) =>
                            [
                                navLinkStyles.base,
                                isActive
                                    ? navLinkStyles.active
                                    : navLinkStyles.inactive,
                            ].join(" ")
                        }
                    >
                        {label}
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default NavLinks;
