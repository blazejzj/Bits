import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../types/post";
import CommentList from "./CommandList";

function BlogPost() {
    const { postid } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/posts/${postid}`,
                    { method: "GET" }
                );
                if (!response.ok) {
                    const data = await response.json();
                    console.error(data.errors || data);
                } else {
                    const data = await response.json();
                    setPost(data.post);
                }
            } catch (err) {
                if (err instanceof Error) console.error(err.message);
            }
        }
        getPost();
    }, [postid]);

    function getFormattedDate(dateString: string) {
        const date = new Date(dateString);
        const parts = date.toDateString().slice(4).split(" ");
        return `${parts[0]} ${parts[1]}, ${parts[2]}`;
    }

    function handleAddComment() {
        // send comment
        console.log("Add comment:", newComment);
        setNewComment("");
    }

    if (!post) return <div>Loading...</div>;

    return (
        <div className="w-full px-4 md:px-8 lg:px-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <header className="mb-4">
                    <h1 className="font-bold text-3xl text-cyan-800 mb-2">
                        {post.title}
                    </h1>
                    <div className="text-sm text-gray-500">
                        Published: {getFormattedDate(post.published_at)}
                        {post.published_at !== post.updated_at && (
                            <span className="ml-4">
                                Updated: {getFormattedDate(post.updated_at)}
                            </span>
                        )}
                    </div>
                </header>
                <div className="prose max-w-none text-gray-700">
                    {post.text.split("\n").map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </div>

            <CommentList
                comments={post.comments}
                getFormattedDate={getFormattedDate}
            />

            <div className="mb-16">
                <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
                <textarea
                    className="w-full border border-gray-300 rounded p-3 mb-2"
                    rows={4}
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="bg-cyan-700 text-white px-5 py-2 rounded hover:bg-cyan-600"
                    onClick={handleAddComment}
                >
                    Submit Comment
                </button>
            </div>
        </div>
    );
}

export default BlogPost;
