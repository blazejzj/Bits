import { useEffect, useState } from "react";
import type { Comment } from "../../types/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ManageComments() {
    const [comments, setComments] = useState<Comment[]>([]);

    // postsRouter.get("/:id/comments", commentController.getAllPostsComments);
    const fetchAllComments = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/comments`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.ok) {
                const body = await response.json();
                setComments(body);
            } else {
                const body = await response.json();
                console.log(body);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAllComments();
    }, []);

    async function deleteComment(comment: Comment) {
        //posts/postId/comments/commentId
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${
                    comment.postId
                }/comments/${comment.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (response.ok) {
                fetchAllComments();
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteResponse(comment: Comment, responseId: string) {
        // posts/postId/commentId/responseId
        const postId = comment.postId;
        const commentId = comment.id;
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/posts/${postId}/comments/${commentId}/${responseId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (response.ok) {
                fetchAllComments();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="p-6 space-y-6">
            {comments.map((com) => (
                <div
                    key={com.id}
                    className="bg-white p-5 rounded-xl shadow flex flex-col gap-4"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-gray-700 font-medium">
                            Author: {com.user.name}
                        </span>
                        <button
                            onClick={() => {
                                deleteComment(com);
                            }}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500">{com.text}</span>
                    </div>

                    <div className="ml-6 space-y-3">
                        <p className="text-gray-700 font-medium">Responses:</p>
                        {com.responses.map((resp) => (
                            <div
                                key={resp.id}
                                className="bg-gray-100 p-3 rounded-lg flex flex-col gap-2"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-700 font-medium">
                                        {resp.user.name}
                                    </span>
                                    <button
                                        onClick={() => {
                                            deleteResponse(com, resp.id);
                                        }}
                                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500">
                                        {resp.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ManageComments;
