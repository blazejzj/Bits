import { SetStateAction } from "react";
import { Category } from "./category";

export interface NavLinkStyles {
    base: string;
    active: string;
    inactive: string;
}

export interface NavLinksProps {
    categories: Category[];
    navLinkStyles: NavLinkStyles;
}

export interface MobileNavMenuProps {
    categories: Category[];
    setMobileOpen: React.Dispatch<SetStateAction<boolean>>;
    handleLogout: () => Promise<void>;
    navLinkStyles: NavLinkStyles;
}
