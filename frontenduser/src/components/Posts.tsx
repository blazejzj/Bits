import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";
import useCategories from "../hooks/useCategories";
import usePosts from "../hooks/usePosts";
import { Category } from "../types/category";

function Posts() {
    const addNewError = useCallback((err: string) => {
        setErrors((prev) => [...prev, err]);
    }, []);
    const [searchParams] = useSearchParams();
    const [errors, setErrors] = useState<string[]>([]);
    const categories = useCategories({ addNewError });
    const posts = usePosts({ addNewError, searchParams });

    const getCategoryName = () => {
        const category = searchParams.get("category");
        let categoryName = "All Posts";

        categories?.forEach((cat: Category) => {
            if (slugify(cat.name) == category) {
                categoryName = cat.name;
            }
        });
        return categoryName;
    };

    const getFormattedDate = (dateString: string) => {
        const date = new Date(dateString);
        const parts = date.toDateString().slice(4).split(" ");
        return `${parts[0]} ${parts[1]}, ${parts[2]}`;
    };

    const getExcerpt = (text: string) => {
        const words = text.split(/\s+/);
        const length = Math.floor(Math.random() * (50 - 40 + 1)) + 40; // random between 40-50
        if (words.length <= length) return text;
        return words.slice(0, length).join(" ") + "...";
    };

    const renderPosts = () => {
        return posts.map((post) => (
            <Link
                to={`/posts/${post.id}`}
                key={post.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
            >
                <header className="mb-4">
                    <h2 className="font-bold text-xl text-cyan-800 mb-2 hover:text-cyan-600 transition-colors duration-200">
                        {post.title}
                    </h2>
                    <time className="text-sm text-gray-500">
                        Published {getFormattedDate(post.published_at)}
                    </time>
                </header>

                <p className="text-gray-700 flex-grow mb-4">
                    {getExcerpt(post.text)}
                </p>

                <span className="mt-auto text-sm font-medium text-cyan-700 hover:underline">
                    Read more →
                </span>
            </Link>
        ));
    };

    const renderEmptyPosts = () => {
        return <h2>No posts in current category.</h2>;
    };

    return (
        <div className="w-full px-4 md:px-8 lg:px-16">
            <h1 className="text-cyan-700 font-bold text-center text-3xl mb-8">
                {getCategoryName()}
            </h1>

            {errors.length > 0 && (
                <div className="mb-6 text-red-600">
                    <p>{errors[0]}</p>
                </div>
            )}

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.length > 0 ? renderPosts() : renderEmptyPosts()}
            </div>
        </div>
    );
}
export default Posts;
