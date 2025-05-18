import { useEffect, useState } from "react";
import type { Post } from "../../types/post";
import ErrorMessage from "../../utils/ErrorMessage";
import type { Category } from "../../types/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faTrash,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

function ManagePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [editedPostCategoryId, setEditedPostCategoryId] = useState<
        number | null
    >(null);
    const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchAllCategories() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts/category`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    const body = await response.json();
                    setError(body.msg);
                } else {
                    const body = await response.json();
                    setCategories(body);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllCategories();
    }, []);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts/admin`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    const body = await response.json();
                    setError(body.msg);
                } else {
                    const body = await response.json();
                    setPosts(body);
                }
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err);
                }
            }
            setLoading(false);
        }
        fetchPosts();
    }, []);

    async function publishPost(postId: number) {
        updatePostPublishedStatus(postId, true);
        const data = {
            id: postId,
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/publish/${postId}`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                console.error(await response.json());
                updatePostPublishedStatus(postId, false);
            }
        } catch (err) {
            console.error(err);
            updatePostPublishedStatus(postId, false);
        }
    }

    async function unpublishPost(postId: number) {
        updatePostPublishedStatus(postId, false);
        const data = {
            id: postId,
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/unpublish/${postId}`,
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                console.error(await response.json());
                updatePostPublishedStatus(postId, true);
            }
        } catch (err) {
            console.error(err);
            updatePostPublishedStatus(postId, true);
        }
    }

    function updatePostPublishedStatus(postId: number, published: boolean) {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, published } : post
            )
        );
    }

    function togglePublished(postId: number, published: boolean) {
        if (published) {
            unpublishPost(postId);
        } else {
            publishPost(postId);
        }
    }

    function getCategoryByCategoryId(id: number) {
        return categories.find((category) => category.id === id);
    }

    function toggleCategoryMenu(postId: number) {
        if (!editedPostCategoryId) {
            setEditedPostCategoryId(postId);
        } else {
            if (postId === editedPostCategoryId) {
                setEditedPostCategoryId(null);
            } else {
                setEditedPostCategoryId(postId);
            }
        }
    }

    function displayCategoryMenu(post: Post) {
        return (
            <div className="absolute top-0 left-27 min-w-[150px] bg-white border border-gray-200 shadow-lg rounded-lg z-30 animate-fade-in flex flex-col p-3">
                <button
                    className="absolute right-4 top-3 p-1 text-gray-400 hover:text-red-500 cursor-pointer "
                    onClick={() => toggleCategoryMenu(post.id)}
                    aria-label="Close category menu"
                    tabIndex={0}
                >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
                <div className="flex flex-col gap-1 mt-8 items-start">
                    {categories
                        .filter((category) => category.id !== post.categoryId)
                        .map((category) => (
                            <button
                                key={category.id}
                                onClick={() =>
                                    handleCategoryChange(post, category.name)
                                }
                                className="text-left px-2 py-2 rounded-md cursor-pointer hover:underline"
                            >
                                {category.name}
                            </button>
                        ))}
                </div>
            </div>
        );
    }

    async function handleCategoryChange(post: Post, categoryName: string) {
        const newCategory = categories.find((cat) => cat.name === categoryName);
        if (!newCategory) return;

        setPosts((prevPosts) =>
            prevPosts.map((p) =>
                p.id === post.id ? { ...p, categoryId: newCategory.id } : p
            )
        );

        const data = {
            id: post.id,
            title: post.title,
            text: post.text,
            categoryName,
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/update/${post.id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                setPosts((prevPosts) =>
                    prevPosts.map((p) =>
                        p.id === post.id
                            ? { ...p, categoryId: post.categoryId }
                            : p
                    )
                );
            }
        } catch (err) {
            console.error(err);
        }
    }

    function toggleDeleting(postId: number) {
        if (!deletingPostId) {
            setDeletingPostId(postId);
        } else {
            if (postId === deletingPostId) {
                setDeletingPostId(null);
            } else {
                setDeletingPostId(postId);
            }
        }
    }

    async function deletePost(postId: number) {
        let prevPosts: typeof posts = [];
        setPosts((current) => {
            prevPosts = current;
            return current.filter((p) => p.id !== postId);
        });

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/delete/${postId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (!response.ok) {
                setPosts(prevPosts);
            }
        } catch (err) {
            console.error(err);
        }
        setDeletingPostId(null);
    }

    return (
        <div>
            {loading ? <ErrorMessage errorMsg={"Loading..."} /> : ""}
            {error ? <ErrorMessage errorMsg={error} /> : ""}
            <div className="grid grid-cols-2 gap-3 mt-3">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="p-5 border-1 border-gray-300 shadow-md flex flex-row items-center justify-between"
                    >
                        <div className="flex flex-col gap-2">
                            <div className={`flex gap-2 items-center relative`}>
                                <p className="text-gray-500">
                                    {
                                        getCategoryByCategoryId(
                                            post.categoryId!
                                        )?.name
                                    }
                                </p>
                                {editedPostCategoryId === post.id ? (
                                    displayCategoryMenu(post)
                                ) : (
                                    <button
                                        className="cursor-pointer"
                                        onClick={() =>
                                            toggleCategoryMenu(post.id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            size="lg"
                                            className="text-gray-700 hover:text-gray-500"
                                        />
                                    </button>
                                )}
                                <div className="flex items-center gap-3">
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => toggleDeleting(post.id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size="lg"
                                            className="text-gray-700 hover:text-gray-500"
                                        />
                                    </button>
                                    {deletingPostId === post.id && (
                                        <div className="p-3 absolute left-45 flex flex-col text-nowrap z-50 bg-white rounded-md gap-3 shadow-md border-1 border-gray-300">
                                            <div className="flex">
                                                <span className="font-bold text-gray-500 mt-3">
                                                    Are you sure?
                                                </span>
                                                <button
                                                    className="absolute right-1 -top-1 p-1 text-gray-400 hover:text-red-500 cursor-pointer "
                                                    onClick={() =>
                                                        toggleDeleting(post.id)
                                                    }
                                                    aria-label="Close category menu"
                                                    tabIndex={0}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                        size="lg"
                                                    />
                                                </button>
                                            </div>

                                            <button
                                                className="cursor-pointer hover:text-red-700 hover:font-bold"
                                                onClick={() =>
                                                    deletePost(post.id)
                                                }
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p>{post.title}</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center self-center justify-center">
                            <span className="text-gray-500">Published</span>
                            <div className="flex items-center">
                                <label className="relative inline-block w-[40px] h-[20px]">
                                    <input
                                        type="checkbox"
                                        checked={post.published}
                                        className="opacity-0 w-0 h-0 peer"
                                        onChange={() =>
                                            togglePublished(
                                                post.id,
                                                post.published
                                            )
                                        }
                                    />
                                    <span
                                        className={`
                                        absolute cursor-pointer top-0 left-0 right-0 bottom-0 
                                        bg-gray-300 rounded-full transition duration-300 
                                        peer-checked:bg-gray-700
                                        before:content-[''] before:absolute before:left-[2px] before:bottom-[4px] 
                                        before:bg-white before:h-[18px] before:w-[18px] before:rounded-full before:top-[1px]
                                        before:transition before:duration-300 
                                        peer-checked:before:translate-x-[18px]
                                        `}
                                    ></span>
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagePosts;
