import { useState } from "react";
import CommentResponses from "./CommentResponses";
import Comment from "../types/comment";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

type Props = {
    comments: Comment[];
    getFormattedDate: (dateString: string) => string;
    getPost: () => void;
};

function CommentList({ comments, getFormattedDate, getPost }: Props) {
    const { user } = useAuth();
    const { postid } = useParams();

    const [responseInputs, setResponseInputs] = useState<
        Record<string, string>
    >({});

    function handleResponseChange(commentId: string, text: string) {
        setResponseInputs(function (prev) {
            return { ...prev, [commentId]: text };
        });
    }

    function handleAddResponse(commentId: string) {
        const text = responseInputs[commentId] || "";
        console.log("Add response to", commentId, text);
        setResponseInputs(function (prev) {
            return { ...prev, [commentId]: "" };
        });
    }

    async function handleDeleteComment(commentId: string) {
        console.log("deleteing" + commentId);
        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/posts/${postid}/comments/${commentId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (!response.ok) {
                console.log(await response.json());
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err);
            }
        }
        getPost();
    }

    function renderDeleteComment(commentId: string) {
        return (
            <button onClick={() => handleDeleteComment(commentId)}>
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-cyan-700 text-xl hover:cursor-pointer"
                />
            </button>
        );
    }

    if (!comments || comments.length === 0) {
        return <p className="text-gray-600">No comments yet.</p>;
    }

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
                Comments
            </h2>
            <div className="space-y-6">
                {comments.map(function (comment) {
                    return (
                        <div
                            key={comment.id}
                            className="bg-white rounded-2xl shadow p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-cyan-700">
                                    {comment.user.name}
                                </span>
                                <span className="text-sm text-gray-500 flex items-center gap-3">
                                    {getFormattedDate(comment.published_at)}
                                    {user?.id === comment.userId
                                        ? renderDeleteComment(comment.id)
                                        : ""}
                                </span>
                            </div>
                            <p className="text-gray-800 mb-4">{comment.text}</p>

                            <CommentResponses
                                comment={comment}
                                responseText={responseInputs[comment.id] || ""}
                                onChange={function (text: string) {
                                    handleResponseChange(comment.id, text);
                                }}
                                onReply={function () {
                                    handleAddResponse(comment.id);
                                }}
                                getFormattedDate={getFormattedDate}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CommentList;
