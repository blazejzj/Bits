import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Post } from "../types/post";
// import { slugify } from "../utils/slugify";

function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    // postsRouter.get(
    //     "/category/:slugname",
    //     postsController.getPostsByCategorySlugname
    // );

    useEffect(() => {
        async function getPosts() {
            if (searchParams.size > 0) {
                const category = searchParams.get("category");
                try {
                    const response = await fetch(
                        `${
                            import.meta.env.VITE_API_URL
                        }/posts/category/${category}`
                    );
                    if (!response.ok) {
                        console.log(await response.json());
                    } else {
                        const data = await response.json();
                        setPosts(data);
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(err.message);
                    }
                }
            } else {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/posts`
                    );
                    if (!response.ok) {
                        console.log(await response.json());
                    } else {
                        const data = await response.json();
                        setPosts(data);
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        console.log(err.message);
                    }
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
