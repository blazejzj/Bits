import { useState } from "react";
import CommentResponses from "./CommentResponses";
import Comment from "../types/comment";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
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
    const [editedCommentId, setEditedCommentId] = useState<string | null>(null);
    const [editedCommentText, setEditedCommentText] = useState<string>();
    const [editedCommentErrors, setEditedCommentErrors] = useState<
        Record<string, string>
    >({});
    const [editedCommentMessages, setEditedCommentMessages] = useState<
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
                    className="text-cyan-700 text-xl transition-colors duration-300 hover:text-cyan-500 hover:cursor-pointer"
                />
            </button>
        );
    }

    function handleEditComment(commentId: string, commentText: string) {
        setEditedCommentId(commentId);
        setEditedCommentText(commentText);
        setEditedCommentMessages({});
        setEditedCommentErrors({});
    }

    function renderEditComment(comment: Comment) {
        return (
            <button onClick={() => handleEditComment(comment.id, comment.text)}>
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-cyan-700 text-xl transition-colors duration-300 hover:text-cyan-500 hover:cursor-pointer"
                />
            </button>
        );
    }

    function addNewEditedCommentError(commentId: string, error: string) {
        setEditedCommentErrors((prev) => ({ ...prev, [commentId]: error }));
    }

    function addNewEditedCommentMessage(commentId: string, msg: string) {
        setEditedCommentMessages((prev) => ({ ...prev, [commentId]: msg }));
    }

    async function handleSaveEdit(commentId: string) {
        try {
            const newComment = {
                text: editedCommentText,
            };
            console.log(newComment);
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/posts/${postid}/comments/${commentId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(newComment),
                }
            );
            if (!response.ok) {
                const body = await response.json();
                addNewEditedCommentError(commentId, body.errors[0].msg);
            } else {
                const body = await response.json();
                addNewEditedCommentMessage(commentId, body.msg);
                setEditedCommentId(null);
                setEditedCommentText("");
            }
        } catch (err) {
            if (err instanceof Error) {
                addNewEditedCommentError(commentId, err.message);
            }
        }
        getPost();
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
                            className="bg-white rounded-2xl shadow p-4 transition-all duration-300"
                        >
                            <div className="flex flex-col mb-2">
                                <div className="flex gap-2">
                                    <span className="text-sm text-gray-500 mb-1 ml-auto">
                                        {getFormattedDate(comment.published_at)}
                                    </span>
                                    {comment.published_at !==
                                        comment.updated_at && (
                                        <>
                                            <span className="text-sm text-gray-500">
                                                (Edited)
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    {editedCommentErrors[comment.id] && (
                                        <p className="bg-red-100 text-red-700 border border-red-200 rounded-md px-4 py-2 mb-2">
                                            {editedCommentErrors[comment.id]}
                                        </p>
                                    )}
                                    {editedCommentMessages[comment.id] && (
                                        <p className="bg-green-100 text-green-700 border border-green-200 rounded-md px-4 py-2 mb-2">
                                            {editedCommentMessages[comment.id]}
                                        </p>
                                    )}

                                    <div className="flex flex-row justify-between">
                                        <span className="font-medium text-cyan-700">
                                            {comment.user.name}
                                        </span>
                                        <span className="text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 text-left sm:text-right">
                                            <div className="flex gap-2 items-center justify-end">
                                                {user?.id === comment.userId &&
                                                    renderEditComment(comment)}
                                                {user?.id === comment.userId &&
                                                    renderDeleteComment(
                                                        comment.id
                                                    )}
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {editedCommentId === comment.id ? (
                                <div className="mb-4">
                                    <textarea
                                        className="w-full border border-gray-300 rounded-2xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all duration-300"
                                        value={editedCommentText}
                                        onChange={(e) =>
                                            setEditedCommentText(e.target.value)
                                        }
                                    />
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            className="bg-cyan-600 text-white px-5 py-2 rounded-full shadow-sm hover:bg-cyan-700 transition duration-300 text-sm hover:cursor-pointer"
                                            onClick={() =>
                                                handleSaveEdit(comment.id)
                                            }
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="text-sm text-gray-500 hover:text-gray-700 transition hover:cursor-pointer"
                                            onClick={() => (
                                                setEditedCommentId(null),
                                                setEditedCommentErrors({}),
                                                setEditedCommentMessages({})
                                            )}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-800 mb-4">
                                    {comment.text}
                                </p>
                            )}

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
