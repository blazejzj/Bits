import { useState, useEffect } from "react";
import { Category } from "../types/category";

type UseCategoriesProps = {
    addNewError: (error: string) => void;
};

export default function useCategories({ addNewError }: UseCategoriesProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function getCategories() {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts/category`
                );
                if (!res.ok) throw new Error("Fetch error: " + res.status);
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                if (error instanceof Error) {
                    addNewError(
                        "Internal server issues. Something went wrong."
                    );
                }
            }
        }

        getCategories();
    }, [addNewError]);

    return categories;
}
