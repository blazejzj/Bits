import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "../../types/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { slugify } from "../../utils/slugify";

function ManageCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editedCategoryId, setEditedCategoryId] = useState<number | null>(
        null
    );
    const [oldCategoryName, setOldCategoryName] = useState<string>("");
    const [editedCategoryName, setEditedCategoryName] = useState<string>("");

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts/category`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    const body = await response.json();
                    setCategories(body);
                }
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err);
                }
            }
        }

        fetchCategories();
    }, []);

    async function deleteCategory(id: number) {}

    async function updateCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const nameUpdateData = {
            name: oldCategoryName,
            newName: editedCategoryName,
        };
        console.log(editedCategoryName);
        console.log(oldCategoryName);
    }

    async function createCategory(name: string) {}

    function toggleEditCategory(id: number, name: string) {
        if (editedCategoryId === null) {
            setEditedCategoryId(id);
            setEditedCategoryName(name);
        } else if (editedCategoryId === id) {
            setEditedCategoryId(null);
            setEditedCategoryName("");
        } else {
            setEditedCategoryId(id);
            setEditedCategoryName(name);
        }
    }

    function renderAllCategories() {
        return (
            <div className="p-7 flex flex-col gap-4">
                <h1 className="font-bold text-2xl">Categories:</h1>
                {categories.map((cat) => (
                    <div key={cat.id}>
                        {editedCategoryId === cat.id ? (
                            <form
                                className="flex gap-2 flex-col"
                                onSubmit={updateCategory}
                            >
                                <input
                                    type="text"
                                    value={editedCategoryName}
                                    required
                                    onChange={(e) =>
                                        setEditedCategoryName(e.target.value)
                                    }
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
                                />
                                <div className="flex gap-2 mt-3">
                                    <button
                                        className="cursor-pointer text-white px-3 py-2 rounded-md hover:bg-gray-500 font-bold bg-gray-600"
                                        type="submit"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() =>
                                            toggleEditCategory(cat.id, cat.name)
                                        }
                                        className="cursor-pointer text-gray-800 hover:text-gray-600 font-bold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex gap-2">
                                <span>{cat.name}</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => (
                                            toggleEditCategory(
                                                cat.id,
                                                cat.name
                                            ),
                                            setOldCategoryName(cat.name)
                                        )}
                                        className="cursor-pointer text-gray-800 hover:text-gray-600"
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            size="lg"
                                        />
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(cat.id)}
                                        className="cursor-pointer text-gray-800 hover:text-gray-600"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size="lg"
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex gap-3 justify-center items-center w-full h-full ">
            <div className="flex">
                {renderAllCategories()}
                <h1>Form to add categories here</h1>
            </div>
        </div>
    );
}

export default ManageCategories;
