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
            <h1>Here are your posts</h1>
            <p>Category chosen {searchParams.get("category")}</p>
            {posts.map((post) => {
                return (
                    <div key={post.id}>
                        <p>{post.title}</p>
                    </div>
                );
            })}
        </div>
    );
}
export default Posts;
