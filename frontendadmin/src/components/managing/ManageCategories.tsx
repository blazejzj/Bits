import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "../../types/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { slugify } from "../../utils/slugify";
import ErrorMessage from "../../utils/ErrorMessage";

function ManageCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editedCategoryId, setEditedCategoryId] = useState<number | null>(
        null
    );
    const [oldCategoryName, setOldCategoryName] = useState<string>("");
    const [editedCategoryName, setEditedCategoryName] = useState<string>("");
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [createCategoryMessage, setCreateCategoryMessage] =
        useState<string>("");

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
    useEffect(() => {
        fetchCategories();
    }, []);

    function resetFormData() {
        setOldCategoryName("");
        setEditedCategoryName("");
        setEditedCategoryId(null);
        setNewCategoryName("");
    }

    async function deleteCategory(name: string) {
        //     "/category/:slugname/delete",
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/category/${slugify(
                    name
                )}/delete`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const body = await response.json();
            if (!response.ok) {
                console.log(body);
            } else {
                fetchCategories();
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function updateCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // we have to update both name and slugname together, because of questionable api design xD
        const nameUpdateData = {
            name: oldCategoryName,
            newName: editedCategoryName,
        };
        const updateDataSlug = {
            slugname: slugify(oldCategoryName),
            newSlugname: slugify(editedCategoryName),
        };

        try {
            // /category/:name/updatename
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/category/${
                    nameUpdateData.name
                }/updatename`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(nameUpdateData),
                }
            );
            if (response.ok) {
                resetFormData();
                // opmtimisticially update categories now
                setCategories((prev) =>
                    prev.map((p) =>
                        p.name === nameUpdateData.name
                            ? { ...p, name: nameUpdateData.newName }
                            : p
                    )
                );
            }
        } catch (err) {
            console.log(err);
        }

        try {
            // /category/:slugname/updateslugname
            await fetch(
                `${import.meta.env.VITE_API_URL}/posts/category/${
                    updateDataSlug.slugname
                }/updateslugname`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(updateDataSlug),
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    async function createCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = {
            name: newCategoryName,
            slugname: slugify(newCategoryName),
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/category/new`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(data),
                    headers: { "Content-type": "application/json" },
                }
            );
            if (!response.ok) {
                const body = await response.json();
                setCreateCategoryMessage(body.msg);
            } else {
                resetFormData();
                fetchCategories();
            }
        } catch (err) {
            console.error(err);
        }
    }

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
            <div className="h-full bg-white shadow rounded-lg p-6 flex flex-col">
                <h2 className="text-2xl font-bold  mb-4 ml-1">
                    All Categories
                </h2>
                <div className="flex flex-col">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex items-center justify-between py-2 border-b last:border-b-0 ml-1 border-gray-300"
                        >
                            {editedCategoryId === cat.id ? (
                                <form
                                    onSubmit={updateCategory}
                                    className="w-full flex flex-col gap-2"
                                >
                                    <input
                                        type="text"
                                        value={editedCategoryName}
                                        required
                                        onChange={(e) =>
                                            setEditedCategoryName(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-500 cursor-pointer"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleEditCategory(
                                                    cat.id,
                                                    cat.name
                                                )
                                            }
                                            className="px-4 py-2 text-gray-600 rounded-md font-medium hover:bg-gray-100 cursor-pointer "
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <span className="text-gray-800">
                                        {cat.name}
                                    </span>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                toggleEditCategory(
                                                    cat.id,
                                                    cat.name
                                                );
                                                setOldCategoryName(cat.name);
                                            }}
                                            className="p-2 cursor-pointer hover:text-gray-500 text-gray-700"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                size="lg"
                                            />
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteCategory(cat.name)
                                            }
                                            className="p-2 cursor-pointer hover:text-gray-500 text-gray-700"
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                size="lg"
                                            />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function renderNewCategoryForm() {
        return (
            <form
                onSubmit={createCategory}
                className="h-full bg-white shadow rounded-lg p-6 flex flex-col"
            >
                <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
                <div className="mb-4 flex flex-col gap-3">
                    {createCategoryMessage && (
                        <ErrorMessage errorMsg={createCategoryMessage} />
                    )}
                    <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-1"
                    >
                        Category Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        value={newCategoryName}
                        placeholder="New category name..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <button
                        type="submit"
                        className="mt-auto px-6 py-3 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-500 self-start cursor-pointer"
                    >
                        Create
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="grid grid-cols-2 gap-6 h-[500px]">
                {renderAllCategories()}
                {renderNewCategoryForm()}
            </div>
        </div>
    );
}

export default ManageCategories;
