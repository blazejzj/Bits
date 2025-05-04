import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../types/post";
import CommentList from "./CommandList";
import { useAuth } from "../hooks/useAuth";

function BlogPost() {
    const { postid } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [newComment, setNewComment] = useState("");
    const { user } = useAuth();
    const [messages, setMessages] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    function addNewError(err: string) {
        setErrors((prev) => [...prev, err]);
    }

    function addNewMessage(msg: string) {
        setMessages((prev) => [...prev, msg]);
    }

    function getFormattedDate(dateString: string) {
        const date = new Date(dateString);
        const parts = date.toDateString().slice(4).split(" ");
        return `${parts[0]} ${parts[1]}, ${parts[2]}`;
    }

    function handleCommentWriteChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setErrors([]);
        setMessages([]);
        setNewComment(e.target.value);
    }

    const getPost = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${postid}`,
                { method: "GET" }
            );
            if (response.ok) {
                const data = await response.json();
                setPost(data.post);
            }
        } catch (err) {
            if (err instanceof Error) console.error(err.message);
        }
    }, [postid]);

    useEffect(() => {
        getPost();
    }, [getPost]);

    async function handleAddComment() {
        try {
            console.log(JSON.stringify(newComment));
            const jsonComment = {
                text: newComment,
            };
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${postid}/comments`,
                {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(jsonComment),
                    credentials: "include",
                }
            );
            if (!response.ok) {
                const body = await response.json();
                addNewError(body.errors[0].msg);
            } else {
                const body = await response.json();
                addNewMessage(body.msg);
                setNewComment("");
                window.scrollTo(0, 0);
            }
        } catch (err) {
            if (err instanceof Error) {
                addNewError(err.message);
            }
        }
        getPost();
    }

    function renderAddNewComment() {
        return (
            <div className="mb-16">
                <>
                    <h3 className="text-xl font-semibold mb-2">
                        Add a Comment
                    </h3>
                    {messages.length > 0 ? (
                        <p className="text-green-700 font-bold mb-3">
                            {messages}
                        </p>
                    ) : (
                        ""
                    )}
                    {errors.length > 0 ? (
                        <p className="text-red-700 font-bold mb-3">{errors}</p>
                    ) : (
                        ""
                    )}
                </>
                <textarea
                    className="w-full border border-gray-300 rounded p-3 mb-2"
                    rows={4}
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={(e) => handleCommentWriteChange(e)}
                />
                <button
                    className="bg-cyan-700 text-white px-5 py-2 rounded hover:bg-cyan-600"
                    onClick={handleAddComment}
                >
                    Submit Comment
                </button>
            </div>
        );
    }

    if (!post) return <div>Loading...</div>;

    return (
        <div className="w-full px-4 md:px-8 lg:px-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <section className="mb-4">
                    <h1 className="font-bold text-3xl text-cyan-800 mb-2">
                        {post.title}
                    </h1>
                    <div className="text-sm text-gray-500">
                        Published: {getFormattedDate(post.published_at)}
                        {post.published_at !== post.updated_at && (
                            <>
                                <span className="ml-4">
                                    Updated: {getFormattedDate(post.updated_at)}
                                </span>
                            </>
                        )}
                    </div>
                </section>
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

            {user ? (
                renderAddNewComment()
            ) : (
                <h3 className="text-xl font-semibold mb-2">
                    Log in to post a comment.
                </h3>
            )}
        </div>
    );
}

export default BlogPost;
