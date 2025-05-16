import { useEffect, useState } from "react";
import type { Post } from "../../types/post";
import ErrorMessage from "../../utils/ErrorMessage";
import type { Category } from "../../types/category";

function ManagePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

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

    function getCategoryByCategoryId(id: number) {
        return categories.find((category) => category.id === id);
    }

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts`,
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
                            <p className="text-gray-500">
                                {
                                    getCategoryByCategoryId(post.categoryId!)
                                        ?.name
                                }
                            </p>
                            <p>{post.title}</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center self-center justify-center">
                            <span className="text-gray-500">Published</span>
                            <div className="flex items-center">
                                <label className="relative inline-block w-[40px] h-[20px]">
                                    <input
                                        type="checkbox"
                                        className="opacity-0 w-0 h-0 peer"
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
