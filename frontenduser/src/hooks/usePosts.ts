import { useEffect, useState } from "react";
import { Post } from "../types/post";

type usePostsProps = {
    addNewError: (err: string) => void;
    searchParams: URLSearchParams;
};

export default function usePosts({ addNewError, searchParams }: usePostsProps) {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function getPosts() {
            const category = searchParams.get("category");
            try {
                const response =
                    searchParams.size > 0
                        ? await fetch(
                              `${
                                  import.meta.env.VITE_API_URL
                              }/posts/category/${category}`,
                              {
                                  method: "GET",
                                  credentials: "include",
                              }
                          )
                        : await fetch(
                              `${import.meta.env.VITE_API_URL}/posts/`,
                              {
                                  method: "GET",
                                  credentials: "include",
                              }
                          );
                if (!response.ok) {
                    const data = await response.json();
                    addNewError(data.message);
                } else {
                    const data = await response.json();
                    setPosts(data);
                }
            } catch (err) {
                if (err instanceof Error) {
                    addNewError(
                        "Internal server issues. Something went wrong."
                    );
                }
            }
        }
        getPosts();
    }, [searchParams, addNewError]);

    return posts;
}
