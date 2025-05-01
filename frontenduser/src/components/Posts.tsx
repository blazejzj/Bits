import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Post } from "../types/post";
// import { slugify } from "../utils/slugify";

function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchParams] = useSearchParams();
    const [errors, setErrors] = useState<string[]>([]);

    const addNewError = (err: string) => {
        setErrors((prev) => [...prev, err]);
    };

    const getCategoryName = () => {
        const category = searchParams.get("category");
        if (category) {
            return category?.charAt(0).toUpperCase() + category?.slice(1);
        } else {
            return "All Posts";
        }
    };

    const getFormattedDate = (date: Date) => {
        // Apr 14, 2025
        const startDate = new Date(date);
        const parts = startDate.toDateString().slice(4).split(" ");

        const formattedDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
        return formattedDate;
    };

    useEffect(() => {
        async function getPosts() {
            const category = searchParams.get("category");
            try {
                const response =
                    searchParams.size > 0
                        ? await fetch(
                              `${
                                  import.meta.env.VITE_API_URL
                              }/posts/category/${category}`
                          )
                        : await fetch(`${import.meta.env.VITE_API_URL}/posts/`);
                if (!response.ok) {
                    const data = await response.json();
                    addNewError(data.message);
                } else {
                    const data = await response.json();
                    setPosts(data);
                }
            } catch (err) {
                if (err instanceof Error) {
                    addNewError(err.message);
                }
            }
        }
        getPosts();
    }, [searchParams]);

    return (
        <div>
            <h1>{getCategoryName()}</h1>
            {posts.map((post) => {
                return (
                    <div key={post.id}>
                        <h2 className="text-green-700">{post.title}</h2>
                        <p className="text-blue-700">{post.text}</p>
                        <span>{getFormattedDate(post.published_at)}</span>
                    </div>
                );
            })}
        </div>
    );
}
export default Posts;
