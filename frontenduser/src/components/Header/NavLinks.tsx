import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { NavLinksProps } from "../../types/nav";
import { slugify } from "../../utils/slugify";

function NavLinks({ categories, navLinkStyles }: NavLinksProps) {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const currentCategory = searchParams.get("category");

    const isBrowseActive = location.pathname === "/posts" && !currentCategory;

    return (
        <nav className="hidden lg:flex flex-1 justify-center space-x-4">
            <NavLink
                to="/"
                end
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
                className={[
                    navLinkStyles.base,
                    isBrowseActive
                        ? navLinkStyles.active
                        : navLinkStyles.inactive,
                ].join(" ")}
            >
                Browse
            </NavLink>

            {categories.map((category) => {
                const slug = slugify(category.name);
                const isActive =
                    location.pathname === "/posts" && currentCategory === slug;

                return (
                    <NavLink
                        key={category.name}
                        to={`/posts?category=${slug}`}
                        className={[
                            navLinkStyles.base,
                            isActive
                                ? navLinkStyles.active
                                : navLinkStyles.inactive,
                        ].join(" ")}
                    >
                        {category.name}
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default NavLinks;
