import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Post } from "../types/post";

function Posts() {
    function slugify(name: string) {
        return name
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/&/g, "and")
            .replace(/[^\w-]/g, "");
    }

    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {});
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);
    return <p>hey</p>;
}

export default Posts;
