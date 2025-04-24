import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Post } from "../types/post";
import { slugify } from "../utils/slugify";

function Posts() {
    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {});
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams);
    return <p>hey</p>;
}

export default Posts;
